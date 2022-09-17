import { useAppSelector, useAppDispatch } from "../app/hooks";
import { IUserStatus } from "../interface/user";
import { append, reset } from "../features/userStatus/userStatusSlice";
import { Dispatch } from "react";


export function useUserStatus(): [ Array<IUserStatus>, Dispatch<IUserStatus>, () => void ]{
    const state: Array<IUserStatus> = useAppSelector((state) => state.userStatus.status);
    const dispatch = useAppDispatch();
    const appendState = (userStatus: IUserStatus) => dispatch(append(userStatus));
    const resetState = () => dispatch(reset());
    return [ state, appendState, resetState ];
}
