export type TPasswordData = {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export type TPasswordChangeFieldsetProps = {
  handler: (data: TPasswordData) => Promise<boolean>;
};
