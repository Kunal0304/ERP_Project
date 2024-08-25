export const bankAccountsLedgerForm = [
    {
        id: 'account_holder_name',
        type: 'text',
        label: 'Account Holder Name',
        params: {
            autoFocus: true,
            required: true
        }
    },
    {
        id: 'account_number',
        type: 'text',
        label: 'Account Number',
        params: {
            required: true
        }
    },
    {
        id: 'ifs_code',
        type: 'text',
        label: 'IFS Code'
    },
    {
        id: 'swift_code',
        type: 'text',
        label: 'Swift Code'
    },
    {
        id: 'bank_name',
        type: 'text',
        label: 'Bank Name',
        params: {
            required: true
        }
    },
    {
        id: 'branch',
        type: 'text',
        label: 'Branch'
    },
    {
        id: 'gst_reg_type',
        type: 'select',
        label: 'GST Registration Type',
        options: [
            {
                id: 'regular',
                name: 'Regular'
            },
            {
                id: 'composition',
                name: 'Composition'
            },
            {
                id: 'unregistered',
                name: 'Unregistered'
            },
            {
                id: 'RCM',
                name: 'RCM'
            },
            {
                id: 'SEZ',
                name: 'SEZ'
            }
        ],
        params: {
            required: true
        }
    },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN'
    }
];

export const bankOCCAccountLedger = [
    {
        id: 'account_holder_name',
        type: 'text',
        label: 'Account Holder Name',
        params: {
            autoFocus: true,
            required: true
        }
    },
    {
        id: 'account_number',
        type: 'text',
        label: 'Account Number',
        params: {
            required: true
        }
    },
    {
        id: 'ifs_code',
        type: 'text',
        label: 'IFS Code',
        params: {
            required: true
        }
    },
    {
        id: 'swift_code',
        type: 'text',
        label: 'Swift Code',
        params: {
            required: true
        }
    },
    {
        id: 'bank_name',
        type: 'text',
        label: 'Bank Name',
        params: {
            required: true
        }
    },
    {
        id: 'branch',
        type: 'text',
        label: 'Branch',
        params: {
            required: true
        }
    },
    {
        id: 'od_limit',
        type: 'text',
        label: 'OD Limit',
        params: {
            required: true
        }
    },
    // {
    //     id: 'enable_cheque_printing',
    //     type: 'text',
    //     label: 'Enable Cheque Printing',
    //     params: {
    //         required: true
    //     }
    // },
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    //     params: {
    //         required: true
    //     }
    // },
    {
        id: 'gst_reg_type',
        type: 'select',
        label: 'GST Registration Type',
        options: [
            {
                id: 'regular',
                name: 'Regular'
            },
            {
                id: 'composition',
                name: 'Composition'
            },
            {
                id: 'unregistered',
                name: 'Unregistered'
            },
            {
                id: 'RCM',
                name: 'RCM'
            },
            {
                id: 'SEZ',
                name: 'SEZ'
            }
        ],
        params: {
            required: true
        }
    },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    }
];

export const capitalAccountLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    //     params: {
    //         required: true
    //     }
    // },
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    },
    {
        id: 'registration_type',
        type: 'text',
        label: 'Registration Type',
        params: {
            required: true
        }
    }
    // Note: 'name', 'group', 'state', 'mailing_address' are excluded as per your request
];

export const cashInHandLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    //     params: {
    //         required: true
    //     }
    // },
    // {
    //     id: 'pan_or_it_no',
    //     type: 'text',
    //     label: 'PAN/IT Number',
    //     params: {
    //         required: true
    //     }
    // }
];

export const currentAssetsLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    //     params: {
    //         required: true
    //     }
    // },
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    },
    {
        id: 'registration_type',
        type: 'text',
        label: 'Registration Type',
        params: {
            required: true
        }
    },
    {
        id: 'statutory_gst',
        type: 'text',
        label: 'Statutory GST',
        params: {
            required: true
        }
    },
    {
        id: 'statutory_appropriate_to',
        type: 'text',
        label: 'Statutory Appropriate To',
        params: {
            required: true
        }
    },
    {
        id: 'statutory_method_of_calculation',
        type: 'text',
        label: 'Statutory Method of Calculation',
        params: {
            required: true
        }
    },
    {
        id: 'statutory_details',
        type: 'select',
        label: 'Statutory Details',
        options: [
            {
                id: true,
                name: 'Yes'
            },
            {
                id: false,
                name: 'No'
            }
        ],
        params: {
            required: true
        }
    },
    {
        id: 'gst_type',
        type: 'select',
        label: 'GST Type',
        options: [
            {
                id: false,
                name: 'Without GST'
            },
            {
                id: 'goods',
                name: 'Goods'
            },
            {
                id: 'services',
                name: 'Services'
            }
        ],
        params: {
            required: true
        }
    }
];
export const currentLiabilitiesLedger = [
    // {
    //     id: 'name',
    //     type: 'text',
    //     label: 'Name',
    //     params: {
    //         required: true
    //     }
    // },
    // {
    //     id: 'group',
    //     type: 'text',
    //     label: 'Group',
    //     params: {
    //         required: true
    //     }
    // },
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    //     params: {
    //         required: true
    //     }
    // },
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    },
    {
        id: 'registration_type',
        type: 'text',
        label: 'Registration Type',
        params: {
            required: true
        }
    },
    {
        id: 'statutory_gst',
        type: 'text',
        label: 'Statutory GST',
        params: {
            required: true
        }
    },
    {
        id: 'statutory_appropriate_to',
        type: 'text',
        label: 'Statutory Appropriate To',
        params: {
            required: true
        }
    },
    {
        id: 'statutory_method_of_calculation',
        type: 'text',
        label: 'Statutory Method of Calculation',
        params: {
            required: true
        }
    },
    {
        id: 'gst_type',
        type: 'select',
        label: 'GST Type',
        options: [
            {
                id: false,
                name: 'Without GST'
            },
            {
                id: 'goods',
                name: 'Goods'
            },
            {
                id: 'services',
                name: 'Services'
            }
        ],
        params: {
            required: true
        }
    }
];
export const depositsAssetLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    },
    {
        id: 'gst_reg_type',
        type: 'select',
        label: 'GST Registration Type',
        options: [
            {
                id: 'regular',
                name: 'Regular'
            },
            {
                id: 'composition',
                name: 'Composition'
            },
            {
                id: 'unregistered',
                name: 'Unregistered'
            },
            {
                id: 'RCM',
                name: 'RCM'
            },
            {
                id: 'SEZ',
                name: 'SEZ'
            }
        ],
        params: {
            required: true
        }
    }
];
export const dutiesTaxesLedger = [
    {
        id: 'type_of_ledger',
        type: 'select',
        label: 'Type of Ledger',
        options: [
            {
                id: 'gst',
                name: 'GST'
            },
            {
                id: 'other',
                name: 'Other'
            }
        ]
    },
    {
        id: 'tax_type',
        type: 'select',
        label: 'Tax Type',
        options: [
            {
                id: 'IGST',
                name: 'IGST'
            },
            {
                id: 'CGST',
                name: 'CGST'
            },
            {
                id: 'SGST',
                name: 'SGST'
            }
        ]
    }
];

export const expensesDirectLedger = [
    {
        id: 'type_of_ledger',
        type: 'select',
        label: 'Type of Ledger',
        options: [
            {
                id: null,
                name: 'Not Applicable'
            },
            {
                id: 'discount',
                name: 'Discount'
            },
            {
                id: 'invoice_rounding',
                name: 'Invoice Rounding'
            }
        ]
    },
    {
        id: 'gst_type',
        type: 'select',
        label: 'GST Type',
        options: [
            {
                id: false,
                name: 'Without GST'
            },
            {
                id: 'goods',
                name: 'Goods'
            },
            {
                id: 'services',
                name: 'Services'
            }
        ],
        params: {
            required: true
        }
    },
    {
        id: 'rounding_method',
        type: 'select',
        label: 'Rounding Method',
        options: [
            {
                id: 'downward_rounding',
                name: 'Downward Rounding'
            },
            {
                id: 'normal_rounding',
                name: 'Normal Rounding'
            },
            {
                id: 'upward_rounding',
                name: 'Upward Rounding'
            }
        ]
    },
    {
        id: 'rounding_limit',
        type: 'text',
        label: 'Rounding Limit'
    },
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    }
];
export const fixedAssetsLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    },
    {
        id: 'gst_type',
        type: 'select',
        label: 'GST Type',
        options: [
            {
                id: false,
                name: 'Without GST'
            },
            {
                id: 'goods',
                name: 'Goods'
            },
            {
                id: 'services',
                name: 'Services'
            }
        ],
        params: {
            required: true
        }
    },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    }
];
export const investmentsLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    }
];

export const loansAdvancesAssetLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    },
    {
        id: 'gst_reg_type',
        type: 'select',
        label: 'GST Registration Type',
        options: [
            {
                id: 'regular',
                name: 'Regular'
            },
            {
                id: 'composition',
                name: 'Composition'
            },
            {
                id: 'unregistered',
                name: 'Unregistered'
            },
            {
                id: 'RCM',
                name: 'RCM'
            },
            {
                id: 'SEZ',
                name: 'SEZ'
            }
        ],
        params: {
            required: true
        }
    },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    }
];
export const loansLiabilityLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    },
    {
        id: 'gst_reg_type',
        type: 'select',
        label: 'GST Registration Type',
        options: [
            {
                id: 'regular',
                name: 'Regular'
            },
            {
                id: 'composition',
                name: 'Composition'
            },
            {
                id: 'unregistered',
                name: 'Unregistered'
            },
            {
                id: 'RCM',
                name: 'RCM'
            },
            {
                id: 'SEZ',
                name: 'SEZ'
            }
        ],
        params: {
            required: true
        }
    },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    }
];
export const miscExpensesAssetLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    }
];
export const provisionsLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    }
];
export const purchaseAccountsLedger = [
    {
        id: 'type_of_ledger',
        type: 'select',
        label: 'Type of Ledger',
        options: [
            {
                id: null,
                name: 'Not Applicable'
            },
            {
                id: 'discount',
                name: 'Discount'
            },
            {
                id: 'invoice_rounding',
                name: 'Invoice Rounding'
            }
        ]
    },
    {
        id: 'rounding_method',
        type: 'select',
        label: 'Rounding Method',
        options: [
            {
                id: 'downward_rounding',
                name: 'Downward Rounding'
            },
            {
                id: 'normal_rounding',
                name: 'Normal Rounding'
            },
            {
                id: 'upward_rounding',
                name: 'Upward Rounding'
            }
        ]
    },
    {
        id: 'rounding_limit',
        type: 'text',
        label: 'Rounding Limit'
    }
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    // {
    //     id: 'pan_or_it_no',
    //     type: 'text',
    //     label: 'PAN/IT Number',
    //     params: {
    //         required: true
    //     }
    // }
];
export const reservesSurplusLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    // {
    //     id: 'pan_or_it_no',
    //     type: 'text',
    //     label: 'PAN/IT Number',
    //     params: {
    //         required: true
    //     }
    // }
];
export const salesAccountsLedger = [
    {
        id: 'type_of_ledger',
        type: 'select',
        label: 'Type of Ledger',
        options: [
            {
                id: null,
                name: 'Not Applicable'
            },
            {
                id: 'discount',
                name: 'Discount'
            },
            {
                id: 'invoice_rounding',
                name: 'Invoice Rounding'
            }
        ]
    },
    {
        id: 'rounding_method',
        type: 'select',
        label: 'Rounding Method',
        options: [
            {
                id: 'downward_rounding',
                name: 'Downward Rounding'
            },
            {
                id: 'normal_rounding',
                name: 'Normal Rounding'
            },
            {
                id: 'upward_rounding',
                name: 'Upward Rounding'
            }
        ]
    },
    {
        id: 'rounding_limit',
        type: 'text',
        label: 'Rounding Limit'
    }
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    // {
    //     id: 'pan_or_it_no',
    //     type: 'text',
    //     label: 'PAN/IT Number',
    //     params: {
    //         required: true
    //     }
    // }
];
export const securedLoansLedger = [
    {
        id: 'statutory_include_value_calculation',
        type: 'select',
        label: 'Statutory Include Value Calculation',
        options: [
            {
                id: null,
                name: 'Not Applicable'
            },
            {
                id: 'gst',
                name: 'GST'
            }
        ]
    },
    {
        id: 'gst_reg_type',
        type: 'select',
        label: 'GST Registration Type',
        options: [
            {
                id: 'regular',
                name: 'Regular'
            },
            {
                id: 'composition',
                name: 'Composition'
            },
            {
                id: 'unregistered',
                name: 'Unregistered'
            },
            {
                id: 'RCM',
                name: 'RCM'
            },
            {
                id: 'SEZ',
                name: 'SEZ'
            }
        ],
        params: {
            required: true
        }
    },
    {
        id: 'statutory_appropriate_to',
        type: 'select',
        label: 'Statutory Appropriate to',
        options: [
            {
                id: 'goods',
                name: 'Goods'
            },
            {
                id: 'goods_and_services',
                name: 'Goods and Services'
            },
            {
                id: 'services',
                name: 'Services'
            }
        ]
    },
    {
        id: 'statutory_method_of_calculation',
        type: 'select',
        label: 'Statutory Method of calculation',
        options: [
            {
                id: 'based_on_qty',
                name: 'Based on QTY'
            },
            {
                id: 'based_on_value',
                name: 'Based on Value'
            }
        ]
    },
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    // {
    //     id: 'pan_or_it_no',
    //     type: 'text',
    //     label: 'PAN/IT Number',
    //     params: {
    //         required: true
    //     }
    // },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    }
];
export const stockInHandLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    // {
    //     id: 'pan_or_it_no',
    //     type: 'text',
    //     label: 'PAN/IT Number',
    //     params: {
    //         required: true
    //     }
    // }
];
export const sundryCreditorsLedger = [
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    },
    {
        id: 'gst_type',
        type: 'select',
        label: 'GST Type',
        options: [
            {
                id: 'regular',
                name: 'Regular'
            },
            {
                id: 'composition',
                name: 'Composition'
            },
            {
                id: 'unregistered',
                name: 'Unregistered'
            },
            {
                id: 'RCM',
                name: 'RCM'
            },
            {
                id: 'SEZ',
                name: 'SEZ'
            }
        ],
        params: {
            required: true
        }
    },
    {
        id: 'show_address',
        type: 'text',
        label: 'Address',
        params: {
            required: true
        }
    }
];
export const sundryDebtorsLedger = [
    {
        id: 'pan_or_it_no',
        type: 'text',
        label: 'PAN/IT Number',
        params: {
            required: true
        }
    },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    },
    {
        id: 'gst_type',
        type: 'select',
        label: 'GST Type',
        options: [
            {
                id: 'regular',
                name: 'Regular'
            },
            {
                id: 'composition',
                name: 'Composition'
            },
            {
                id: 'unregistered',
                name: 'Unregistered'
            },
            {
                id: 'RCM',
                name: 'RCM'
            },
            {
                id: 'SEZ',
                name: 'SEZ'
            }
        ],
        params: {
            required: true
        }
    },
    {
        id: 'show_address',
        type: 'text',
        label: 'Address',
        params: {
            required: true
        }
    }
];

export const suspenseAccountLedger = [
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    // {
    //     id: 'pan_or_it_no',
    //     type: 'text',
    //     label: 'PAN/IT Number',
    //     params: {
    //         required: true
    //     }
    // }
];
export const unsecuredLoansLedger = [
    {
        id: 'statutory_include_value_calculation',
        type: 'select',
        label: 'Statutory Include Value Calculation',
        options: [
            {
                id: null,
                name: 'Not Applicable'
            },
            {
                id: 'gst',
                name: 'GST'
            }
        ]
    },
    {
        id: 'gst_reg_type',
        type: 'select',
        label: 'GST Registration Type',
        options: [
            {
                id: 'regular',
                name: 'Regular'
            },
            {
                id: 'composition',
                name: 'Composition'
            },
            {
                id: 'unregistered',
                name: 'Unregistered'
            },
            {
                id: 'RCM',
                name: 'RCM'
            },
            {
                id: 'SEZ',
                name: 'SEZ'
            }
        ],
        params: {
            required: true
        }
    },
    {
        id: 'statutory_appropriate_to',
        type: 'select',
        label: 'Statutory Appropriate to',
        options: [
            {
                id: 'goods',
                name: 'Goods'
            },
            {
                id: 'goods_and_services',
                name: 'Goods and Services'
            },
            {
                id: 'services',
                name: 'Services'
            }
        ]
    },
    {
        id: 'statutory_method_of_calculation',
        type: 'select',
        label: 'Statutory Method of calculation',
        options: [
            {
                id: 'based_on_qty',
                name: 'Based on QTY'
            },
            {
                id: 'based_on_value',
                name: 'Based on Value'
            }
        ]
    },
    // {
    //     id: 'mailing_name',
    //     type: 'text',
    //     label: 'Mailing Name',
    // },
    // {
    //     id: 'pan_or_it_no',
    //     type: 'text',
    //     label: 'PAN/IT Number',
    //     params: {
    //         required: true
    //     }
    // },
    {
        id: 'gstin_uin',
        type: 'text',
        label: 'GSTIN/UIN',
        params: {
            required: true
        }
    }
];

// Not available
export const branchDivisionsLedger = [];
export const directExpensesLedger = [
    {
        id: 'gst_type',
        type: 'select',
        label: 'GST Type',
        options: [
            {
                id: false,
                name: 'Without GST'
            },
            {
                id: 'goods',
                name: 'Goods'
            },
            {
                id: 'services',
                name: 'Services'
            }
        ],
        params: {
            required: true
        }
    }
];
export const directIncomesLedger = [
    {
        id: 'gst_type',
        type: 'select',
        label: 'GST Type',
        options: [
            {
                id: false,
                name: 'Without GST'
            },
            {
                id: 'goods',
                name: 'Goods'
            },
            {
                id: 'services',
                name: 'Services'
            }
        ],
        params: {
            required: true
        }
    }
];
export const expensesIndirectLedger = [
    {
        id: 'gst_type',
        type: 'select',
        label: 'GST Type',
        options: [
            {
                id: false,
                name: 'Without GST'
            },
            {
                id: 'goods',
                name: 'Goods'
            },
            {
                id: 'services',
                name: 'Services'
            }
        ],
        params: {
            required: true
        }
    }
];
export const incomeDirectLedger = [
    {
        id: 'gst_type',
        type: 'select',
        label: 'GST Type',
        options: [
            {
                id: false,
                name: 'Without GST'
            },
            {
                id: 'goods',
                name: 'Goods'
            },
            {
                id: 'services',
                name: 'Services'
            }
        ],
        params: {
            required: true
        }
    }
];
export const incomeIndirectLedger = [
    {
        id: 'gst_type',
        type: 'select',
        label: 'GST Type',
        options: [
            {
                id: false,
                name: 'Without GST'
            },
            {
                id: 'goods',
                name: 'Goods'
            },
            {
                id: 'services',
                name: 'Services'
            }
        ],
        params: {
            required: true
        }
    }
];
export const indirectExpensesLedger = [];
export const indirectIncomesLedger = [];
