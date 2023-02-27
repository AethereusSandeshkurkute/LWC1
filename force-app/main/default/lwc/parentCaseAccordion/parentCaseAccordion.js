import { LightningElement, wire } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import getAllParentCases from "@salesforce/apex/getParentCase.getCaseData";
import getChildCases from "@salesforce/apex/getParentCase.getChildCase";


const COLS = [
    { fieldName: "CaseNumber", label: "Case Number" },
    { fieldName: "Subject", label: "Subject" },
    { fieldName: "Origin", label: "Case Origin" }
];

export default class ParentCaseAccordion extends LightningElement {
    gridColumns = COLS;
    isLoading = true;
    gridData = [];

    @wire(getAllParentCases, {})
    parentAccounts({ error, data }) {
        if (error) {
           
        } else if (data) {
            this.gridData = data.map((account) => ({
                _children: [],
                ...account,
                ParentAccountName: account.Parent?.CaseNumber
            }));
            this.isLoading = false;
        }
    }

    handleOnToggle(event) {
      
        const rowName = event.detail.name;
        if (!event.detail.hasChildrenContent && event.detail.isExpanded) {
            this.isLoading = true;
            getChildCases({ parentId: rowName })
                .then((result) => {
                    console.log(result);
                    if (result && result.length > 0) {
                        const newChildren = result.map((child) => ({
                            _children: [],
                            ...child,
                            ParentAccountName: child.Parent?.Name
                        }));
                        this.gridData = this.getNewDataWithChildren(
                            rowName,
                            this.gridData,
                            newChildren
                        );
                    } else {
                        this.dispatchEvent(
                            new ShowToastEvent({
                                title: "No children",
                                message: "No children for the selected Case",
                                variant: "warning"
                            })
                        );
                    }
                })
                .catch((error) => {
                    
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: "Error Loading Child Cases",
                            message: error + " " + error?.message,
                            variant: "error"
                        })
                    );
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }
    }

    getNewDataWithChildren(rowName, data, children) {
        return data.map((row) => {
            let hasChildrenContent = false;
            if (
                Object.prototype.hasOwnProperty.call(row, "_children") &&
                Array.isArray(row._children) &&
                row._children.length > 0
            ) {
                hasChildrenContent = true;
            }

            if (row.Id === rowName) {
                row._children = children;
            } else if (hasChildrenContent) {
                this.getNewDataWithChildren(rowName, row._children, children);
            }
            return row;
        });
    }
}