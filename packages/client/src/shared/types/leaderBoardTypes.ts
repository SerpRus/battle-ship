export type UserRatingDataType = {
  battleShipRating: number;
  login: string;
  position: number;
  time: number;
  userName: string;
  avatar?: string;
  display_name?: string;
};

export type UserRatingFullDataType = {
  data: UserRatingDataType;
  ratingFieldName: string;
};

export type GetAllUsersRatingDataType = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type UsersRatingDataType = {
  data: UserRatingDataType;
};
