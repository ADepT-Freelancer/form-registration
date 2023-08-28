export type SearchFormInputType = {
  setUsers: (users: SearchUserType[]) => void;
  setSearchTemp: (searchTemp: string) => void;
  searchTemp: string;
};
export type SearchFormUsersType = {
  setSelectUsersChanged: (selectUsersChanged: string) => void;
  initialTimeSeconds: number;
  setSeconds: (initialTimeSecond: number) => void;
  setUserDetails: (userDetails: UserType | null) => void;
  users: SearchUserType[];
};
export type SearchFormUsersAntdType = {
  setSelectedUser: (selectedUser: SearchUserType | null) => void;
  selectedUser: SearchUserType | null;
  searchTemp: string;
  setSelectUsersChanged: (selectUsersChanged: string) => void;
  initialTimeSeconds: number;
  setSeconds: (initialTimeSecond: number) => void;
  setUserDetails: (userDetails: UserType | null) => void;
  users: SearchUserType[];
};
export type UserDetailsType = {
  setSelectedUser: (selectedUser: SearchUserType | null) => void;
  selectUsersChanged: string;
  initialTimeSeconds: number;
  setSeconds: (initialTimeSecond: number) => void;
  setSelectUsersChanged: (SelectUsersChanged: string) => void;
  seconds: number;
  userDetails: null | UserType;
  setUserDetails: (userDetails: null | UserType) => void;
};
export type TimerType = {
  setSelectUsersChanged: (SelectUsersChanged: string) => void;
  setSelectedUser: (selectedUser: SearchUserType | null) => void;
  selectUsersChanged: string;
  initialTimeSeconds: number;
  isTimerFinished: () => void;
  seconds: number;
  setSeconds: (actualTime: number) => void;
};
export type SearchUserType = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
};
export type UserType = {
  id: number;
  login: string;
  avatar_url: string;
};
export type PaginationPosition = "top" | "bottom" | "both";
export type SearchResult = { items: SearchUserType[]; total_count: number };
export type PaginationAlign = "start" | "center" | "end";

export type GetCaptchaUrlResponseType = {
  url: string;
};

export type authDataType = {
  password: string;
  remember: boolean;
  email: string;
  captcha?: string | null;
};
export interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}