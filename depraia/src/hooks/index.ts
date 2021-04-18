import { useContext, useEffect, useRef } from "react";
import { CommonContext, IStore } from "../provider";

export const useCommonStore = (): IStore => useContext(CommonContext) as IStore;

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  })
  return ref.current;
}
