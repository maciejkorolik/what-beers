export type Beer = {
  brewery: string;
  name: string;
  data: string;
  type: string;
  image: string | null;
  price?: string;
};

declare global {
  const SLACK_HOOK_URL: string;
  const MESSAGE_TOKEN: string;
}
