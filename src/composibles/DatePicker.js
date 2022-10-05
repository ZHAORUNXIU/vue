import { ref } from "vue";

export const value = ref("");
export const shortcuts = [
    {
        text: "Today",
        value: new Date(),
    },
    {
        text: "Yesterday",
        value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return date;
        },
    },
    {
        text: "A week ago",
        value: () => {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            return date;
        },
    },
];
export const disabledDate = (time) => {
    return time.getTime() > Date.now();
};

// // 返回对象，或者也可以返回函数，但是引入是不能解构 import {value,shortcuts,disabledDate} from "..."
// export default {
//     value,
//     shortcuts,
//     disabledDate,
// };

// export default function() {
//     return {value,shortcuts,disabledDate}
// }

// 如果引入时要解构 import {value,shortcuts,disabledDate} from "..."
// 每项const单独 export
