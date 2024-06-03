export interface Course {
    id:number,
    firstName: string,
    lastName: string,
    salary: number,
    isMarried: boolean,
    description: string,
    category: any
}

export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    phoneNumber?: string;
    description?: string;
}