const ExcelJS = require('exceljs');
const { test, expect } = require('@playwright/test');



async function readExcelFile(worksheet, searchValue) {
    const output = {
        row: -1,
        column: -1,
    };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchValue) {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
}



async function updateCellValue(searchValue, newValue, change, filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcelFile(worksheet, searchValue);

    // Update the value of a specific cell (e.g., A1)
    const cell = worksheet.getCell(output.row + (change.rowChange || 0), output.column + (change.columnChange || 0));
    cell.value = newValue;

    // Save the changes to the Excel file
    await workbook.xlsx.writeFile(filePath);
    console.log('Cell value updated successfully');
}

updateCellValue("Mango", 350, { rowChange: 0, columnChange: 2 }, "/Users/gaurav/Downloads/excelDownloadTest.xlsx");

test("Upload and Download Validations", async ({ page }) => { 

    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    await downloadPromise;
    await updateCellValue("Mango", 350, { rowChange: 0, columnChange: 2 }, "/Users/gaurav/Downloads/download.xlsx");
    // const uploadPromise = page.waitForEvent('filechooser');
    await page.pause();
    await page.locator("#fileinput").click()
    await page.locator("#fileinput").setInputFiles("/Users/gaurav/Downloads/download.xlsx");
    // await uploadPromise;
    // lecture 85 time 0:40 

});
