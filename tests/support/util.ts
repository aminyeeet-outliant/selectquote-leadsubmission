import { expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { CSV_DIR } from "./constant";

export function compareTestDataToPayload(payloadData?: string, testDataValue?: string) {
    if (testDataValue) {
        expect(testDataValue).toBe(payloadData)
    }
}

export function getGenderValue(gender?: string) {
    const genderMap: { [key: string]: string } = {
        "Male": "m",
        "Female": "f",
    }
    if (gender) {
        return genderMap[gender]
    }
    return ""
}

export function formatDate(month: string, day: string, year: string): string {
    const monthMap: { [key: string]: string } = {
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        September: "09",
        October: "10",
        November: "11",
        December: "12",
    };

    const mm = monthMap[month];
    const dd = day.padStart(2, "0"); // ensures 2 digits
    return `${year}-${mm}-${dd}`;
}

export function getTodayDate(): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    return `${month}-${day}-${year}`;
}

export function saveDictToCSV(data: Record<string, any>, filename: string) {
    const filePath = path.resolve(CSV_DIR, filename);

    // Convert object keys and values
    const headers = Object.keys(data).join(",");
    const values = Object.values(data)
        .map(v => `"${String(v).replace(/"/g, '""')}"`) // escape quotes
        .join(",");

    // If file doesn't exist → create with headers
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, headers + "\n" + values + "\n", "utf8");
    } else {
        fs.appendFileSync(filePath, values + "\n", "utf8");
    }
}
