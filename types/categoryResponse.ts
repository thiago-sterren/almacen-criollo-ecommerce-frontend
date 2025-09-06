import { CategoryType } from "./category"

export type CategoryResponseType = {
    result: CategoryType[] | null;
    loading: boolean;
    error: string
}