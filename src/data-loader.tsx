export const LOAD_DATA = "loadData";
export type LoadData<Props, T> = (props: Props) => Promise<Partial<T>>;
export function dataLoader<Props, T>(loadData: LoadData<Props, T>) {
    return function (constructor: React.ComponentClass<Props>) {
        constructor[LOAD_DATA] = loadData;
        return constructor;

    } as any;
}

export const LOAD_PROPS = "loadProps";
