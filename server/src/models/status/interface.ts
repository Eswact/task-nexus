export default interface IStatus {
    user: string;
    list: {
      name: string;
      value: number;
    }[];
}