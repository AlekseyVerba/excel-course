import ExcelComponent from "../../core/ExcelComponent";
export default class Formula extends ExcelComponent {
    static className = "excel__formula";
    toHTML() {
        return `
            <div class="formula">fx</div>
            <div class="input" contenteditable="true"></div>
        `;
    }
}