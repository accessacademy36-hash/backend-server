import axios from "axios";

const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID!;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID!;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET!;

// ─── Get OAuth Access Token ───────────────────────────────────────────────────
const getZoomAccessToken = async (): Promise<string> => {
  const credentials = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString("base64");

  const response = await axios.post(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
    {},
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return response.data.access_token;
};

// ─── Create Zoom Meeting ──────────────────────────────────────────────────────
export const createZoomMeeting = async (data: {
  topic: string;
  startTime: Date;
  durationMinutes: number;
}): Promise<{ meetingId: string; meetingLink: string }> => {
  const token = await getZoomAccessToken();

  const response = await axios.post(
    "https://api.zoom.us/v2/users/me/meetings",
    {
      topic: data.topic,
      type: 2, // Scheduled meeting
      start_time: data.startTime.toISOString(),
      duration: data.durationMinutes,
      settings: {
        waiting_room: false,
        join_before_host: true,
        auto_recording: "none",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return {
    meetingId: String(response.data.id),
    meetingLink: response.data.join_url,
  };
};

// ─── Update Zoom Meeting (for delays/reschedule) ──────────────────────────────
export const updateZoomMeeting = async (
  meetingId: string,
  data: { startTime: Date; durationMinutes: number }
): Promise<void> => {
  const token = await getZoomAccessToken();

  await axios.patch(
    `https://api.zoom.us/v2/meetings/${meetingId}`,
    {
      start_time: data.startTime.toISOString(),
      duration: data.durationMinutes,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// ─── Delete Zoom Meeting ──────────────────────────────────────────────────────
export const deleteZoomMeeting = async (meetingId: string): Promise<void> => {
  const token = await getZoomAccessToken();

  await axios.delete(`https://api.zoom.us/v2/meetings/${meetingId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};