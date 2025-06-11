export default interface IPriority {
    user: string;
    list: {
      name: string;
      value: number;
    }[];
}