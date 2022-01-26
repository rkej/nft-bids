import moment from "moment";

export const calculateTimeDifference = (unixTime: number) =>
  moment.unix(unixTime).fromNow();

export const hasExpired = (unixTime: number): boolean => {
    if( unixTime <= Math.round((new Date()).getTime() / 1000)) {
        return true;
    }
    return false;
}