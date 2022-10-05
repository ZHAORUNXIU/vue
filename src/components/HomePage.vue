<template>
    <h1>This is Home!</h1>
    <hr>
    <el-date-picker v-model="value" type="date" placeholder="Pick a day" :disabled-date="disabledDate" :shortcuts="shortcuts" />
</template>

<script setup>
import { value, shortcuts, disabledDate } from "@/composibles/DatePicker.js";
// 因为使用了<script setup> 不需要将上述三项强制暴露出去
</script>
 