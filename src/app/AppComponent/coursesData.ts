import { Course } from "./types";
export enum CategoryType {
    beginners = 1,
    intermediate = 2,
    advanced = 3,
    other
}
export const coursesData: Array<Course> = [
    {
        id: 1,
        firstName: "Amer",
        lastName: "Elarabi",
        salary: 1000,
        isMarried: true,
        description: "Amer Lorem ipsum dolor sit amet consectetur adipisicing!",
        category: CategoryType.beginners
    },
    {
        id: 2,
        firstName: "Ahmed",
        lastName: "Rouby",
        salary: 1100,
        isMarried: true,
        description: "Ahmed Lorem ipsum dolor sit amet consectetur adipisicing!",
        category: CategoryType.intermediate,
    },
    {
        id: 3,
        firstName: "Mohamed",
        lastName: "Ibrahem",
        salary: 1110,
        isMarried: true,
        description: "mohamed Lorem ipsum dolor sit amet consectetur adipisicing!",
        category: CategoryType.intermediate
    },
    {
        id: 4,
        firstName: "Ali",
        lastName: "Elarabi",
        salary: 1200,
        isMarried: true,
        description: "Ali Lorem ipsum dolor sit amet consectetur adipisicing!",
        category: CategoryType.advanced,
    },
    {
        id: 5,
        firstName: "Esmaiel",
        lastName: "Mohamed",
        salary: 1634,
        isMarried: true,
        description: "Esmaiel Lorem ipsum dolor sit amet consectetur adipisicing!"
        , category: CategoryType.beginners
    },
    {
        id: 6,
        firstName: "Khalid",
        lastName: "Ibrahem",
        salary: 1720,
        isMarried: true,
        description: "Khalid Lorem ipsum dolor sit amet consectetur adipisicing!"
        , category: CategoryType.intermediate
    },

    {
        id: 7,
        firstName: "Hussaien",
        lastName: "Ghaniem",
        salary: 1550,
        isMarried: true,
        description: "Hussaien Lorem ipsum dolor sit amet consectetur adipisicing!"
        , category: CategoryType.beginners
    },
    {
        id: 8,
        firstName: "Ramdan",
        lastName: "Kareem",
        salary: 1400,
        isMarried: true,
        description: "Ramdan Lorem ipsum dolor sit amet consectetur adipisicing!"
        , category: CategoryType.advanced
    },
    {
        id: 9,
        firstName: "Eid",
        lastName: "Saied",
        salary: 2000,
        isMarried: true,
        description: "Eid Lorem ipsum dolor sit amet consectetur adipisicing!"
        , category: CategoryType.beginners
    },
    {
        id: 10,
        firstName: "Salah",
        lastName: "Rady",
        salary: 2000,
        isMarried: true,
        description: "Salah Lorem ipsum dolor sit amet consectetur adipisicing!"
        , category: CategoryType.beginners
    }
];
