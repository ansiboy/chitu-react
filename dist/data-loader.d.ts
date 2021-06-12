export declare const LOAD_DATA = "loadData";
export declare type LoadData<Props, T> = (props: Props) => Promise<Partial<T>>;
export declare function dataLoader<Props, T>(loadData: LoadData<Props, T>): any;
