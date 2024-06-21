import { Course } from "./types";
export enum CategoryType {
    beginners = 1,
    intermediate = 2,
    advanced = 3,
    other
}

export const coursesData: Array<Course> = [
    {
        id: "",
        firstName: "Mustafa",
        lastName: "Hany",
        coursePrice: 1000,
        experienceInTheField: "Is Experience in the field: 2 Years",
        description: "Introduction to Web Development: Learn the basics of HTML, CSS, and JavaScript By Web Development.",
        category: CategoryType.beginners,
        imgUrl: "../../assets/images/1.jpg"
    },
    {
        id: "",
        firstName: "Enas",
        lastName: "Ahmed",
        coursePrice: 1100,
        experienceInTheField: "Is Experience in the field: 4 Years",
        description: "Advanced JavaScript Course: Understanding events, AJAX, and new ES6 features Advanced JavaScript.",
        category: CategoryType.intermediate,
        imgUrl: "../../assets/images/2.jpg"
    },
    {
        id: "",
        firstName: "Mohamed",
        lastName: "Ibrahem",
        coursePrice: 1110,
        experienceInTheField: "Is Experience in the field: 6 Years",
        description: "React App Development: Build interactive interfaces using React and Redux By React App Development.",
        category: CategoryType.intermediate,
        imgUrl: "../../assets/images/3.jpg"
    },
    {
        id: "",
        firstName: "Ali",
        lastName: "Elarabi",
        coursePrice: 1200,
        experienceInTheField: "Is Experience in the field: 11 Years",
        description: "Mastering Web Development with Node.js: Create powerful and secure servers using Node.js and Express.",
        category: CategoryType.advanced,
        imgUrl: "../../assets/images/4.jpg"
    },
    {
        id: "",
        firstName: "Manal",
        lastName: "Mohamed",
        coursePrice: 1634,
        experienceInTheField: "Is Experience in the field: 10 Years",
        description: "Introduction to Programming: Learn the basics of programming using Python By ntroduction to Programming.",
        category: CategoryType.beginners,
        imgUrl: "../../assets/images/5.jpg"
    },
    {
        id: "",
        firstName: "Khalid",
        lastName: "Ibrahem",
        coursePrice: 1720,
        experienceInTheField: "Is Experience in the field: 9 Years",
        description: "Advanced Programming with Java: Design and implement large and complex applications.",
        category: CategoryType.intermediate,
        imgUrl: "../../assets/images/6.jpg"
    },
    {
        id: "",
        firstName: "Hussaien",
        lastName: "Ghaniem",
        coursePrice: 1550,
        experienceInTheField: "Is Experience in the field: 8 Years",
        description: "Basic Mobile App Development with Flutter: Build native applications for iOS and Android.",
        category: CategoryType.beginners,
        imgUrl: "../../assets/images/7.jpg"
    },
    {
        id: "",
        firstName: "Ramdan",
        lastName: "Kareem",
        coursePrice: 1400,
        experienceInTheField: "Is Experience in the field: 7 Years",
        description: "Advanced Mobile App Development with React Native: Efficiently build cross-platform applications.",
        category: CategoryType.advanced,
        imgUrl: "../../assets/images/8.jpg"
    },
    {
        id: "",
        firstName: "Eid",
        lastName: "Saied",
        coursePrice: 2000,
        experienceInTheField: "Is Experience in the field: 6 Years",
        description: "Introduction to Data Science: Learn data analysis and pattern extraction using Python tools.",
        category: CategoryType.beginners,
        imgUrl: "../../assets/images/9.jpg"
    },
    {
        id: "",
        firstName: "Salah",
        lastName: "Rady",
        coursePrice: 2000,
        experienceInTheField: "Is Experience in the field: 5 Years",
        description: "Comprehensive Machine Learning Course: Build and train machine learning models using Scikit-Learn and TensorFlow.",
        category: CategoryType.beginners,
        imgUrl: "../../assets/images/10.jpg"
    }
];
