export type TAvatarProps = {
  url: string;
  handler: (value: File) => Promise<boolean>;
};
