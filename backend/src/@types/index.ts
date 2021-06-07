export type WithError<T> = Promise<[T | null, Error]>;

export async function wrapError<T>(
  p: Promise<T>,
): WithError<T> {
  try {
    return [await p, null];
  } catch (err) {
    return [null, err];
  }
}

export type PasswordConfirm = {
  oldPassword: string,
  password: string
};

export type GroupByAndCountBuilder = {
  tableName: string,
  field: string,
  isAge?: boolean,
  condition?: string,
  sort?: boolean
};

export type GraphGroup = {
  title: string,
  graphs: Graph[],
};

export type Graph = {
  title: string,
  data: GraphData[],
  type: string,
  label?: string,
  groupByInterval?: boolean,
};

export type GraphData = {
  label: string,
  value: number,
};
