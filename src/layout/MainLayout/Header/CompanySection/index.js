import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Tooltip,
} from '@mui/material';
import { Formik, useFormik } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from 'axiosInstance';
import { IconSquareRoundedPlus, IconSquareRoundedX } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentCompany as setCurrentReduxCompany } from 'store/customActions';
import { useRef } from 'react';
import { Settings } from '@mui/icons-material';
import Address from 'components/Address';
import GridInput from './GridInput';
import GridAutoComplete from './GridAutoComplete';
import GridInputSelect from './GridInputSelect';
import { toast } from 'react-toastify';

const currency = Object.entries({
    USD: {
        symbol: '$',
        name: 'US Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'USD',
        name_plural: 'US dollars'
    },
    CAD: {
        symbol: 'CA$',
        name: 'Canadian Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'CAD',
        name_plural: 'Canadian dollars'
    },
    EUR: {
        symbol: '€',
        name: 'Euro',
        symbol_native: '€',
        decimal_digits: 2,
        rounding: 0,
        code: 'EUR',
        name_plural: 'euros'
    },
    AED: {
        symbol: 'AED',
        name: 'United Arab Emirates Dirham',
        symbol_native: 'د.إ.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'AED',
        name_plural: 'UAE dirhams'
    },
    AFN: {
        symbol: 'Af',
        name: 'Afghan Afghani',
        symbol_native: '؋',
        decimal_digits: 0,
        rounding: 0,
        code: 'AFN',
        name_plural: 'Afghan Afghanis'
    },
    ALL: {
        symbol: 'ALL',
        name: 'Albanian Lek',
        symbol_native: 'Lek',
        decimal_digits: 0,
        rounding: 0,
        code: 'ALL',
        name_plural: 'Albanian lekë'
    },
    AMD: {
        symbol: 'AMD',
        name: 'Armenian Dram',
        symbol_native: 'դր.',
        decimal_digits: 0,
        rounding: 0,
        code: 'AMD',
        name_plural: 'Armenian drams'
    },
    ARS: {
        symbol: 'AR$',
        name: 'Argentine Peso',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'ARS',
        name_plural: 'Argentine pesos'
    },
    AUD: {
        symbol: 'AU$',
        name: 'Australian Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'AUD',
        name_plural: 'Australian dollars'
    },
    AZN: {
        symbol: 'man.',
        name: 'Azerbaijani Manat',
        symbol_native: 'ман.',
        decimal_digits: 2,
        rounding: 0,
        code: 'AZN',
        name_plural: 'Azerbaijani manats'
    },
    BAM: {
        symbol: 'KM',
        name: 'Bosnia-Herzegovina Convertible Mark',
        symbol_native: 'KM',
        decimal_digits: 2,
        rounding: 0,
        code: 'BAM',
        name_plural: 'Bosnia-Herzegovina convertible marks'
    },
    BDT: {
        symbol: 'Tk',
        name: 'Bangladeshi Taka',
        symbol_native: '৳',
        decimal_digits: 2,
        rounding: 0,
        code: 'BDT',
        name_plural: 'Bangladeshi takas'
    },
    BGN: {
        symbol: 'BGN',
        name: 'Bulgarian Lev',
        symbol_native: 'лв.',
        decimal_digits: 2,
        rounding: 0,
        code: 'BGN',
        name_plural: 'Bulgarian leva'
    },
    BHD: {
        symbol: 'BD',
        name: 'Bahraini Dinar',
        symbol_native: 'د.ب.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'BHD',
        name_plural: 'Bahraini dinars'
    },
    BIF: {
        symbol: 'FBu',
        name: 'Burundian Franc',
        symbol_native: 'FBu',
        decimal_digits: 0,
        rounding: 0,
        code: 'BIF',
        name_plural: 'Burundian francs'
    },
    BND: {
        symbol: 'BN$',
        name: 'Brunei Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'BND',
        name_plural: 'Brunei dollars'
    },
    BOB: {
        symbol: 'Bs',
        name: 'Bolivian Boliviano',
        symbol_native: 'Bs',
        decimal_digits: 2,
        rounding: 0,
        code: 'BOB',
        name_plural: 'Bolivian bolivianos'
    },
    BRL: {
        symbol: 'R$',
        name: 'Brazilian Real',
        symbol_native: 'R$',
        decimal_digits: 2,
        rounding: 0,
        code: 'BRL',
        name_plural: 'Brazilian reals'
    },
    BWP: {
        symbol: 'BWP',
        name: 'Botswanan Pula',
        symbol_native: 'P',
        decimal_digits: 2,
        rounding: 0,
        code: 'BWP',
        name_plural: 'Botswanan pulas'
    },
    BYN: {
        symbol: 'Br',
        name: 'Belarusian Ruble',
        symbol_native: 'руб.',
        decimal_digits: 2,
        rounding: 0,
        code: 'BYN',
        name_plural: 'Belarusian rubles'
    },
    BZD: {
        symbol: 'BZ$',
        name: 'Belize Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'BZD',
        name_plural: 'Belize dollars'
    },
    CDF: {
        symbol: 'CDF',
        name: 'Congolese Franc',
        symbol_native: 'FrCD',
        decimal_digits: 2,
        rounding: 0,
        code: 'CDF',
        name_plural: 'Congolese francs'
    },
    CHF: {
        symbol: 'CHF',
        name: 'Swiss Franc',
        symbol_native: 'CHF',
        decimal_digits: 2,
        rounding: 0.05,
        code: 'CHF',
        name_plural: 'Swiss francs'
    },
    CLP: {
        symbol: 'CL$',
        name: 'Chilean Peso',
        symbol_native: '$',
        decimal_digits: 0,
        rounding: 0,
        code: 'CLP',
        name_plural: 'Chilean pesos'
    },
    CNY: {
        symbol: 'CN¥',
        name: 'Chinese Yuan',
        symbol_native: 'CN¥',
        decimal_digits: 2,
        rounding: 0,
        code: 'CNY',
        name_plural: 'Chinese yuan'
    },
    COP: {
        symbol: 'CO$',
        name: 'Colombian Peso',
        symbol_native: '$',
        decimal_digits: 0,
        rounding: 0,
        code: 'COP',
        name_plural: 'Colombian pesos'
    },
    CRC: {
        symbol: '₡',
        name: 'Costa Rican Colón',
        symbol_native: '₡',
        decimal_digits: 0,
        rounding: 0,
        code: 'CRC',
        name_plural: 'Costa Rican colóns'
    },
    CVE: {
        symbol: 'CV$',
        name: 'Cape Verdean Escudo',
        symbol_native: 'CV$',
        decimal_digits: 2,
        rounding: 0,
        code: 'CVE',
        name_plural: 'Cape Verdean escudos'
    },
    CZK: {
        symbol: 'Kč',
        name: 'Czech Republic Koruna',
        symbol_native: 'Kč',
        decimal_digits: 2,
        rounding: 0,
        code: 'CZK',
        name_plural: 'Czech Republic korunas'
    },
    DJF: {
        symbol: 'Fdj',
        name: 'Djiboutian Franc',
        symbol_native: 'Fdj',
        decimal_digits: 0,
        rounding: 0,
        code: 'DJF',
        name_plural: 'Djiboutian francs'
    },
    DKK: {
        symbol: 'Dkr',
        name: 'Danish Krone',
        symbol_native: 'kr',
        decimal_digits: 2,
        rounding: 0,
        code: 'DKK',
        name_plural: 'Danish kroner'
    },
    DOP: {
        symbol: 'RD$',
        name: 'Dominican Peso',
        symbol_native: 'RD$',
        decimal_digits: 2,
        rounding: 0,
        code: 'DOP',
        name_plural: 'Dominican pesos'
    },
    DZD: {
        symbol: 'DA',
        name: 'Algerian Dinar',
        symbol_native: 'د.ج.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'DZD',
        name_plural: 'Algerian dinars'
    },
    EEK: {
        symbol: 'Ekr',
        name: 'Estonian Kroon',
        symbol_native: 'kr',
        decimal_digits: 2,
        rounding: 0,
        code: 'EEK',
        name_plural: 'Estonian kroons'
    },
    EGP: {
        symbol: 'EGP',
        name: 'Egyptian Pound',
        symbol_native: 'ج.م.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'EGP',
        name_plural: 'Egyptian pounds'
    },
    ERN: {
        symbol: 'Nfk',
        name: 'Eritrean Nakfa',
        symbol_native: 'Nfk',
        decimal_digits: 2,
        rounding: 0,
        code: 'ERN',
        name_plural: 'Eritrean nakfas'
    },
    ETB: {
        symbol: 'Br',
        name: 'Ethiopian Birr',
        symbol_native: 'Br',
        decimal_digits: 2,
        rounding: 0,
        code: 'ETB',
        name_plural: 'Ethiopian birrs'
    },
    GBP: {
        symbol: '£',
        name: 'British Pound Sterling',
        symbol_native: '£',
        decimal_digits: 2,
        rounding: 0,
        code: 'GBP',
        name_plural: 'British pounds sterling'
    },
    GEL: {
        symbol: 'GEL',
        name: 'Georgian Lari',
        symbol_native: 'GEL',
        decimal_digits: 2,
        rounding: 0,
        code: 'GEL',
        name_plural: 'Georgian laris'
    },
    GHS: {
        symbol: 'GH₵',
        name: 'Ghanaian Cedi',
        symbol_native: 'GH₵',
        decimal_digits: 2,
        rounding: 0,
        code: 'GHS',
        name_plural: 'Ghanaian cedis'
    },
    GNF: {
        symbol: 'FG',
        name: 'Guinean Franc',
        symbol_native: 'FG',
        decimal_digits: 0,
        rounding: 0,
        code: 'GNF',
        name_plural: 'Guinean francs'
    },
    GTQ: {
        symbol: 'GTQ',
        name: 'Guatemalan Quetzal',
        symbol_native: 'Q',
        decimal_digits: 2,
        rounding: 0,
        code: 'GTQ',
        name_plural: 'Guatemalan quetzals'
    },
    HKD: {
        symbol: 'HK$',
        name: 'Hong Kong Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'HKD',
        name_plural: 'Hong Kong dollars'
    },
    HNL: {
        symbol: 'HNL',
        name: 'Honduran Lempira',
        symbol_native: 'L',
        decimal_digits: 2,
        rounding: 0,
        code: 'HNL',
        name_plural: 'Honduran lempiras'
    },
    HRK: {
        symbol: 'kn',
        name: 'Croatian Kuna',
        symbol_native: 'kn',
        decimal_digits: 2,
        rounding: 0,
        code: 'HRK',
        name_plural: 'Croatian kunas'
    },
    HUF: {
        symbol: 'Ft',
        name: 'Hungarian Forint',
        symbol_native: 'Ft',
        decimal_digits: 0,
        rounding: 0,
        code: 'HUF',
        name_plural: 'Hungarian forints'
    },
    IDR: {
        symbol: 'Rp',
        name: 'Indonesian Rupiah',
        symbol_native: 'Rp',
        decimal_digits: 0,
        rounding: 0,
        code: 'IDR',
        name_plural: 'Indonesian rupiahs'
    },
    ILS: {
        symbol: '₪',
        name: 'Israeli New Sheqel',
        symbol_native: '₪',
        decimal_digits: 2,
        rounding: 0,
        code: 'ILS',
        name_plural: 'Israeli new sheqels'
    },
    INR: {
        symbol: 'Rs',
        name: 'Indian Rupee',
        symbol_native: 'টকা',
        decimal_digits: 2,
        rounding: 0,
        code: 'INR',
        name_plural: 'Indian rupees'
    },
    IQD: {
        symbol: 'IQD',
        name: 'Iraqi Dinar',
        symbol_native: 'د.ع.‏',
        decimal_digits: 0,
        rounding: 0,
        code: 'IQD',
        name_plural: 'Iraqi dinars'
    },
    IRR: {
        symbol: 'IRR',
        name: 'Iranian Rial',
        symbol_native: '﷼',
        decimal_digits: 0,
        rounding: 0,
        code: 'IRR',
        name_plural: 'Iranian rials'
    },
    ISK: {
        symbol: 'Ikr',
        name: 'Icelandic Króna',
        symbol_native: 'kr',
        decimal_digits: 0,
        rounding: 0,
        code: 'ISK',
        name_plural: 'Icelandic krónur'
    },
    JMD: {
        symbol: 'J$',
        name: 'Jamaican Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'JMD',
        name_plural: 'Jamaican dollars'
    },
    JOD: {
        symbol: 'JD',
        name: 'Jordanian Dinar',
        symbol_native: 'د.أ.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'JOD',
        name_plural: 'Jordanian dinars'
    },
    JPY: {
        symbol: '¥',
        name: 'Japanese Yen',
        symbol_native: '￥',
        decimal_digits: 0,
        rounding: 0,
        code: 'JPY',
        name_plural: 'Japanese yen'
    },
    KES: {
        symbol: 'Ksh',
        name: 'Kenyan Shilling',
        symbol_native: 'Ksh',
        decimal_digits: 2,
        rounding: 0,
        code: 'KES',
        name_plural: 'Kenyan shillings'
    },
    KHR: {
        symbol: 'KHR',
        name: 'Cambodian Riel',
        symbol_native: '៛',
        decimal_digits: 2,
        rounding: 0,
        code: 'KHR',
        name_plural: 'Cambodian riels'
    },
    KMF: {
        symbol: 'CF',
        name: 'Comorian Franc',
        symbol_native: 'FC',
        decimal_digits: 0,
        rounding: 0,
        code: 'KMF',
        name_plural: 'Comorian francs'
    },
    KRW: {
        symbol: '₩',
        name: 'South Korean Won',
        symbol_native: '₩',
        decimal_digits: 0,
        rounding: 0,
        code: 'KRW',
        name_plural: 'South Korean won'
    },
    KWD: {
        symbol: 'KD',
        name: 'Kuwaiti Dinar',
        symbol_native: 'د.ك.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'KWD',
        name_plural: 'Kuwaiti dinars'
    },
    KZT: {
        symbol: 'KZT',
        name: 'Kazakhstani Tenge',
        symbol_native: 'тңг.',
        decimal_digits: 2,
        rounding: 0,
        code: 'KZT',
        name_plural: 'Kazakhstani tenges'
    },
    LBP: {
        symbol: 'L.L.',
        name: 'Lebanese Pound',
        symbol_native: 'ل.ل.‏',
        decimal_digits: 0,
        rounding: 0,
        code: 'LBP',
        name_plural: 'Lebanese pounds'
    },
    LKR: {
        symbol: 'SLRs',
        name: 'Sri Lankan Rupee',
        symbol_native: 'SL Re',
        decimal_digits: 2,
        rounding: 0,
        code: 'LKR',
        name_plural: 'Sri Lankan rupees'
    },
    LTL: {
        symbol: 'Lt',
        name: 'Lithuanian Litas',
        symbol_native: 'Lt',
        decimal_digits: 2,
        rounding: 0,
        code: 'LTL',
        name_plural: 'Lithuanian litai'
    },
    LVL: {
        symbol: 'Ls',
        name: 'Latvian Lats',
        symbol_native: 'Ls',
        decimal_digits: 2,
        rounding: 0,
        code: 'LVL',
        name_plural: 'Latvian lati'
    },
    LYD: {
        symbol: 'LD',
        name: 'Libyan Dinar',
        symbol_native: 'د.ل.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'LYD',
        name_plural: 'Libyan dinars'
    },
    MAD: {
        symbol: 'MAD',
        name: 'Moroccan Dirham',
        symbol_native: 'د.م.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'MAD',
        name_plural: 'Moroccan dirhams'
    },
    MDL: {
        symbol: 'MDL',
        name: 'Moldovan Leu',
        symbol_native: 'MDL',
        decimal_digits: 2,
        rounding: 0,
        code: 'MDL',
        name_plural: 'Moldovan lei'
    },
    MGA: {
        symbol: 'MGA',
        name: 'Malagasy Ariary',
        symbol_native: 'MGA',
        decimal_digits: 0,
        rounding: 0,
        code: 'MGA',
        name_plural: 'Malagasy Ariaries'
    },
    MKD: {
        symbol: 'MKD',
        name: 'Macedonian Denar',
        symbol_native: 'MKD',
        decimal_digits: 2,
        rounding: 0,
        code: 'MKD',
        name_plural: 'Macedonian denari'
    },
    MMK: {
        symbol: 'MMK',
        name: 'Myanma Kyat',
        symbol_native: 'K',
        decimal_digits: 0,
        rounding: 0,
        code: 'MMK',
        name_plural: 'Myanma kyats'
    },
    MOP: {
        symbol: 'MOP$',
        name: 'Macanese Pataca',
        symbol_native: 'MOP$',
        decimal_digits: 2,
        rounding: 0,
        code: 'MOP',
        name_plural: 'Macanese patacas'
    },
    MUR: {
        symbol: 'MURs',
        name: 'Mauritian Rupee',
        symbol_native: 'MURs',
        decimal_digits: 0,
        rounding: 0,
        code: 'MUR',
        name_plural: 'Mauritian rupees'
    },
    MXN: {
        symbol: 'MX$',
        name: 'Mexican Peso',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'MXN',
        name_plural: 'Mexican pesos'
    },
    MYR: {
        symbol: 'RM',
        name: 'Malaysian Ringgit',
        symbol_native: 'RM',
        decimal_digits: 2,
        rounding: 0,
        code: 'MYR',
        name_plural: 'Malaysian ringgits'
    },
    MZN: {
        symbol: 'MTn',
        name: 'Mozambican Metical',
        symbol_native: 'MTn',
        decimal_digits: 2,
        rounding: 0,
        code: 'MZN',
        name_plural: 'Mozambican meticals'
    },
    NAD: {
        symbol: 'N$',
        name: 'Namibian Dollar',
        symbol_native: 'N$',
        decimal_digits: 2,
        rounding: 0,
        code: 'NAD',
        name_plural: 'Namibian dollars'
    },
    NGN: {
        symbol: '₦',
        name: 'Nigerian Naira',
        symbol_native: '₦',
        decimal_digits: 2,
        rounding: 0,
        code: 'NGN',
        name_plural: 'Nigerian nairas'
    },
    NIO: {
        symbol: 'C$',
        name: 'Nicaraguan Córdoba',
        symbol_native: 'C$',
        decimal_digits: 2,
        rounding: 0,
        code: 'NIO',
        name_plural: 'Nicaraguan córdobas'
    },
    NOK: {
        symbol: 'Nkr',
        name: 'Norwegian Krone',
        symbol_native: 'kr',
        decimal_digits: 2,
        rounding: 0,
        code: 'NOK',
        name_plural: 'Norwegian kroner'
    },
    NPR: {
        symbol: 'NPRs',
        name: 'Nepalese Rupee',
        symbol_native: 'नेरू',
        decimal_digits: 2,
        rounding: 0,
        code: 'NPR',
        name_plural: 'Nepalese rupees'
    },
    NZD: {
        symbol: 'NZ$',
        name: 'New Zealand Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'NZD',
        name_plural: 'New Zealand dollars'
    },
    OMR: {
        symbol: 'OMR',
        name: 'Omani Rial',
        symbol_native: 'ر.ع.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'OMR',
        name_plural: 'Omani rials'
    },
    PAB: {
        symbol: 'B/.',
        name: 'Panamanian Balboa',
        symbol_native: 'B/.',
        decimal_digits: 2,
        rounding: 0,
        code: 'PAB',
        name_plural: 'Panamanian balboas'
    },
    PEN: {
        symbol: 'S/.',
        name: 'Peruvian Nuevo Sol',
        symbol_native: 'S/.',
        decimal_digits: 2,
        rounding: 0,
        code: 'PEN',
        name_plural: 'Peruvian nuevos soles'
    },
    PHP: {
        symbol: '₱',
        name: 'Philippine Peso',
        symbol_native: '₱',
        decimal_digits: 2,
        rounding: 0,
        code: 'PHP',
        name_plural: 'Philippine pesos'
    },
    PKR: {
        symbol: 'PKRs',
        name: 'Pakistani Rupee',
        symbol_native: '₨',
        decimal_digits: 0,
        rounding: 0,
        code: 'PKR',
        name_plural: 'Pakistani rupees'
    },
    PLN: {
        symbol: 'zł',
        name: 'Polish Zloty',
        symbol_native: 'zł',
        decimal_digits: 2,
        rounding: 0,
        code: 'PLN',
        name_plural: 'Polish zlotys'
    },
    PYG: {
        symbol: '₲',
        name: 'Paraguayan Guarani',
        symbol_native: '₲',
        decimal_digits: 0,
        rounding: 0,
        code: 'PYG',
        name_plural: 'Paraguayan guaranis'
    },
    QAR: {
        symbol: 'QR',
        name: 'Qatari Rial',
        symbol_native: 'ر.ق.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'QAR',
        name_plural: 'Qatari rials'
    },
    RON: {
        symbol: 'RON',
        name: 'Romanian Leu',
        symbol_native: 'RON',
        decimal_digits: 2,
        rounding: 0,
        code: 'RON',
        name_plural: 'Romanian lei'
    },
    RSD: {
        symbol: 'din.',
        name: 'Serbian Dinar',
        symbol_native: 'дин.',
        decimal_digits: 0,
        rounding: 0,
        code: 'RSD',
        name_plural: 'Serbian dinars'
    },
    RUB: {
        symbol: 'RUB',
        name: 'Russian Ruble',
        symbol_native: '₽.',
        decimal_digits: 2,
        rounding: 0,
        code: 'RUB',
        name_plural: 'Russian rubles'
    },
    RWF: {
        symbol: 'RWF',
        name: 'Rwandan Franc',
        symbol_native: 'FR',
        decimal_digits: 0,
        rounding: 0,
        code: 'RWF',
        name_plural: 'Rwandan francs'
    },
    SAR: {
        symbol: 'SR',
        name: 'Saudi Riyal',
        symbol_native: 'ر.س.‏',
        decimal_digits: 2,
        rounding: 0,
        code: 'SAR',
        name_plural: 'Saudi riyals'
    },
    SDG: {
        symbol: 'SDG',
        name: 'Sudanese Pound',
        symbol_native: 'SDG',
        decimal_digits: 2,
        rounding: 0,
        code: 'SDG',
        name_plural: 'Sudanese pounds'
    },
    SEK: {
        symbol: 'Skr',
        name: 'Swedish Krona',
        symbol_native: 'kr',
        decimal_digits: 2,
        rounding: 0,
        code: 'SEK',
        name_plural: 'Swedish kronor'
    },
    SGD: {
        symbol: 'S$',
        name: 'Singapore Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'SGD',
        name_plural: 'Singapore dollars'
    },
    SOS: {
        symbol: 'Ssh',
        name: 'Somali Shilling',
        symbol_native: 'Ssh',
        decimal_digits: 0,
        rounding: 0,
        code: 'SOS',
        name_plural: 'Somali shillings'
    },
    SYP: {
        symbol: 'SY£',
        name: 'Syrian Pound',
        symbol_native: 'ل.س.‏',
        decimal_digits: 0,
        rounding: 0,
        code: 'SYP',
        name_plural: 'Syrian pounds'
    },
    THB: {
        symbol: '฿',
        name: 'Thai Baht',
        symbol_native: '฿',
        decimal_digits: 2,
        rounding: 0,
        code: 'THB',
        name_plural: 'Thai baht'
    },
    TND: {
        symbol: 'DT',
        name: 'Tunisian Dinar',
        symbol_native: 'د.ت.‏',
        decimal_digits: 3,
        rounding: 0,
        code: 'TND',
        name_plural: 'Tunisian dinars'
    },
    TOP: {
        symbol: 'T$',
        name: 'Tongan Paʻanga',
        symbol_native: 'T$',
        decimal_digits: 2,
        rounding: 0,
        code: 'TOP',
        name_plural: 'Tongan paʻanga'
    },
    TRY: {
        symbol: 'TL',
        name: 'Turkish Lira',
        symbol_native: 'TL',
        decimal_digits: 2,
        rounding: 0,
        code: 'TRY',
        name_plural: 'Turkish Lira'
    },
    TTD: {
        symbol: 'TT$',
        name: 'Trinidad and Tobago Dollar',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'TTD',
        name_plural: 'Trinidad and Tobago dollars'
    },
    TWD: {
        symbol: 'NT$',
        name: 'New Taiwan Dollar',
        symbol_native: 'NT$',
        decimal_digits: 2,
        rounding: 0,
        code: 'TWD',
        name_plural: 'New Taiwan dollars'
    },
    TZS: {
        symbol: 'TSh',
        name: 'Tanzanian Shilling',
        symbol_native: 'TSh',
        decimal_digits: 0,
        rounding: 0,
        code: 'TZS',
        name_plural: 'Tanzanian shillings'
    },
    UAH: {
        symbol: '₴',
        name: 'Ukrainian Hryvnia',
        symbol_native: '₴',
        decimal_digits: 2,
        rounding: 0,
        code: 'UAH',
        name_plural: 'Ukrainian hryvnias'
    },
    UGX: {
        symbol: 'USh',
        name: 'Ugandan Shilling',
        symbol_native: 'USh',
        decimal_digits: 0,
        rounding: 0,
        code: 'UGX',
        name_plural: 'Ugandan shillings'
    },
    UYU: {
        symbol: '$U',
        name: 'Uruguayan Peso',
        symbol_native: '$',
        decimal_digits: 2,
        rounding: 0,
        code: 'UYU',
        name_plural: 'Uruguayan pesos'
    },
    UZS: {
        symbol: 'UZS',
        name: 'Uzbekistan Som',
        symbol_native: 'UZS',
        decimal_digits: 0,
        rounding: 0,
        code: 'UZS',
        name_plural: 'Uzbekistan som'
    },
    VEF: {
        symbol: 'Bs.F.',
        name: 'Venezuelan Bolívar',
        symbol_native: 'Bs.F.',
        decimal_digits: 2,
        rounding: 0,
        code: 'VEF',
        name_plural: 'Venezuelan bolívars'
    },
    VND: {
        symbol: '₫',
        name: 'Vietnamese Dong',
        symbol_native: '₫',
        decimal_digits: 0,
        rounding: 0,
        code: 'VND',
        name_plural: 'Vietnamese dong'
    },
    XAF: {
        symbol: 'FCFA',
        name: 'CFA Franc BEAC',
        symbol_native: 'FCFA',
        decimal_digits: 0,
        rounding: 0,
        code: 'XAF',
        name_plural: 'CFA francs BEAC'
    },
    XOF: {
        symbol: 'CFA',
        name: 'CFA Franc BCEAO',
        symbol_native: 'CFA',
        decimal_digits: 0,
        rounding: 0,
        code: 'XOF',
        name_plural: 'CFA francs BCEAO'
    },
    YER: {
        symbol: 'YR',
        name: 'Yemeni Rial',
        symbol_native: 'ر.ي.‏',
        decimal_digits: 0,
        rounding: 0,
        code: 'YER',
        name_plural: 'Yemeni rials'
    },
    ZAR: {
        symbol: 'R',
        name: 'South African Rand',
        symbol_native: 'R',
        decimal_digits: 2,
        rounding: 0,
        code: 'ZAR',
        name_plural: 'South African rand'
    },
    ZMK: {
        symbol: 'ZK',
        name: 'Zambian Kwacha',
        symbol_native: 'ZK',
        decimal_digits: 0,
        rounding: 0,
        code: 'ZMK',
        name_plural: 'Zambian kwachas'
    },
    ZWL: {
        symbol: 'ZWL$',
        name: 'Zimbabwean Dollar',
        symbol_native: 'ZWL$',
        decimal_digits: 0,
        rounding: 0,
        code: 'ZWL',
        name_plural: 'Zimbabwean Dollar'
    }
}).map((c) => c[1]);

export default function CompanySection() {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [companies, setCompanies] = useState([]);

    const [isCompanySelectOpen, setIsCompanySelectOpen] = useState(false);

    // const [currentCompany, setCurrentCompany] = useState(null)
    const currentCompany = useSelector((state) => state.custom.currentCompany);
    const setCurrentCompany = (company) => dispatch(setCurrentReduxCompany(company));

    const [addCompanyDialog, setAddCompanyDialog] = useState(false);
    const [editCompanyDialog, setEditCompanyDialog] = useState(false);

    const [multipleGSTDialog, setMultipleGSTDialog] = useState(false)

    const [states, setStates] = useState([])

    const formRef = useRef();

    // const [defaultState, setDefaultState] = useState('')

    const fetchAllCompanies = () => {
        axiosInstance.get('/company/company/').then((response) => {
            if (response.data.length == 0) {
                setAddCompanyDialog(true);
                setEditCompanyDialog(false);
            }
            if (!currentCompany && response.data.length > 0) {
                setCurrentCompany(response.data[0]);
            }
            setCompanies(response.data);
        });
    };

    const getMaxObjectKey = (arr, defaultValue = -1) => {
        const reversedArr = Object.keys(arr).filter(key => Number.isInteger(+key)).reverse()
        if (reversedArr.length)
            return parseInt(reversedArr[0])
        else
            return defaultValue
    }

    const getCompany = (company) => {
        const c = company

        if (!c.gst_details.default)
            c.gst_details.default = {
                id: '',
                registration_type: 'regular',
                assessee_of_other_territory: false,
                gstin_uin: '',
                periodicity: 'monthly',
                e_way_bill_applicable: false,
                e_way_bill_applicable_from: `${year}-04-01`,
                e_way_bill_applicable_for_intrastate: '',
                pan_number: '',
                e_invoicing_applicable: false,
                e_invoicing_applicable_from: `${year}-04-01`,
                invoice_bill_from_place: '',
                tax_rate: '',
                tax_calculation_type: '',
                state: '',
            }

        c.gst_details.tmp = {
            id: '',
            registration_type: 'regular',
            assessee_of_other_territory: false,
            gstin_uin: '',
            periodicity: 'monthly',
            e_way_bill_applicable: false,
            e_way_bill_applicable_from: `${year}-04-01`,
            e_way_bill_applicable_for_intrastate: '',
            pan_number: '',
            e_invoicing_applicable: false,
            e_invoicing_applicable_from: `${year}-04-01`,
            invoice_bill_from_place: '',
            tax_rate: '',
            tax_calculation_type: '',
            state: '',
        }
        c.gst_details.reset = {
            id: '',
            registration_type: 'regular',
            assessee_of_other_territory: false,
            gstin_uin: '',
            periodicity: 'monthly',
            e_way_bill_applicable: false,
            e_way_bill_applicable_from: `${year}-04-01`,
            e_way_bill_applicable_for_intrastate: '',
            pan_number: '',
            e_invoicing_applicable: false,
            e_invoicing_applicable_from: `${year}-04-01`,
            invoice_bill_from_place: '',
            tax_rate: '',
            tax_calculation_type: '',
            state: '',
        }
        return company
    }

    useEffect(() => {
        fetchAllCompanies();
    }, []);

    const currentDate = new Date();
    const year = currentDate.getMonth() >= 3 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;

    const formik = useFormik({
        initialValues: {
            id: '',
            name: '',
            address: '',
            city: '',
            pincode: '',
            mobile: '',
            email: '',
            website: '',
            base_currency: '',
            country: '',
            // country: 4,
            // country: countries.find(country => country.name == 'India')?.id || '',
            state: '',
            // state: 142,
            // state: states.find(state => state.name == 'Gujarat')?.id || '',
            supply_type: '',
            financial_year_beginning: `${year}-04-01`,
            registration_status: false,
            // - - - - -
            gst_details: {
                default: {
                    id: '',
                    registration_type: 'regular',
                    assessee_of_other_territory: false,
                    gstin_uin: '',
                    periodicity: 'monthly',
                    e_way_bill_applicable: false,
                    e_way_bill_applicable_from: `${year}-04-01`,
                    e_way_bill_applicable_for_intrastate: '',
                    pan_number: '',
                    e_invoicing_applicable: false,
                    e_invoicing_applicable_from: `${year}-04-01`,
                    invoice_bill_from_place: '',
                    tax_rate: '',
                    tax_calculation_type: '',
                    state: '',
                },
                tmp: {
                    id: '',
                    registration_type: 'regular',
                    assessee_of_other_territory: false,
                    gstin_uin: '',
                    periodicity: 'monthly',
                    e_way_bill_applicable: false,
                    e_way_bill_applicable_from: `${year}-04-01`,
                    e_way_bill_applicable_for_intrastate: '',
                    pan_number: '',
                    e_invoicing_applicable: false,
                    e_invoicing_applicable_from: `${year}-04-01`,
                    invoice_bill_from_place: '',
                    tax_rate: '',
                    tax_calculation_type: '',
                    state: '',
                },
                reset: {
                    id: '',
                    registration_type: 'regular',
                    assessee_of_other_territory: false,
                    gstin_uin: '',
                    periodicity: 'monthly',
                    e_way_bill_applicable: false,
                    e_way_bill_applicable_from: `${year}-04-01`,
                    e_way_bill_applicable_for_intrastate: '',
                    pan_number: '',
                    e_invoicing_applicable: false,
                    e_invoicing_applicable_from: `${year}-04-01`,
                    invoice_bill_from_place: '',
                    tax_rate: '',
                    tax_calculation_type: '',
                    state: '',
                },
            },
            // - - - - -
            // --- // registration_type: 'regular',
            // --- // assessee_of_other_territory: false,
            // --- // gstin_uin: '',
            // --- // periodicity: 'monthly',
            multiple_gst: false,
            // 
            // --- // e_way_bill_applicable: false,
            // --- // e_way_bill_applicable_from: `${year}-04-01`,
            // --- // e_way_bill_applicable_for_intrastate: '',
            // --- // pan_number: '',
            cin_number: '',
            tan_number: '',
            // --- // e_invoicing_applicable: false,
            // --- // e_invoicing_applicable_from: `${year}-04-01`,
            // --- // invoice_bill_from_place: '',
            // --- // tax_rate: '',
            // --- // tax_calculation_type: '',
            bank_name: '',
            account_holder_name: '',
            account_number: '',
            bank_ifsc: '',
            bank_swift: '',
            bank_branch: '',
            bank_address: '',
            bank_gst: '',
            bank_opening_balance: '0',
            bank_balance_type: 'CR',
            print_in_invoice: false
        },
        onSubmit: async (values, { setErrors }) => {
            const request_data = values;
            console.log(request_data)

            // if (request_data)
            //     return

            try {
                if (addCompanyDialog) await axiosInstance.post(`/company/company/`, request_data);
                if (editCompanyDialog) await axiosInstance.patch(`/company/company/${request_data.id}/`, request_data);

                fetchAllCompanies();
                alert(`Company ${editCompanyDialog ? 'edited' : 'created'} successfully`);
                setAddCompanyDialog(false);
                setEditCompanyDialog(false);
                formik.resetForm();
            } catch (error) {
                if (error.response && error.response.status == 400) {
                    const response_data = error.response.data;
                    const errors = {};

                    let message = '';
                    Object.keys(response_data).forEach((field) => {
                        errors[field] = response_data[field][0];
                        message += `${field}: ${errors[field]} \n`;
                    });
                    alert(message);
                    setErrors(errors);
                    // alert('Please check all sections of company creation')
                }
            }
        },
        // enableReinitialize: true
    });

    localStorage.setItem('current_company', JSON.stringify(currentCompany));
    currentCompany && localStorage.setItem('current_company_id', currentCompany.id);

    // console.log(formik.values)

    useEffect(() => {
        if (formik.values.country) {
            axiosInstance.get(`/company/country/${formik.values.country}/`).then((response) => {
                setStates(response.data.states);
            });
        }
    }, [formik.values.country]);

    const [currentSection, setCurrentSection] = useState(0);
    const sections = [
        [
            // Name
            <GridInput
                key={'0'}
                formik={formik}
                name={'name'}
                label={'Company Name'}
                required
                autoFocus
                inputProps={{
                    onChange: (e) => {
                        formik.setFieldValue('account_holder_name', e.target.value);
                    }
                }}
            />,

            // Mobile
            <GridInput
                key={'1'}
                formik={formik}
                name={'mobile'}
                required
            />,

            // Email
            <GridInput
                key={'2'}
                formik={formik}
                name={'email'}
            />,

            // Website
            <GridInput
                key={'3'}
                formik={formik}
                name={'website'}
            />,

            // Address
            <Address key={'4'} item formik={formik} displayCountries={true} md={4} />,

            // Base Currency
            <GridAutoComplete
                key={'5'}
                formik={formik}
                name={'base_currency'}
                options={currency}
                getOptionLabel={(option) => `${option.symbol} - ${option.name} - ${option.code}`}
                getValue={currency.find((c) => c.code == formik.values.base_currency) || null}
                onChange={(event, newValue) => { formik.setFieldValue('base_currency', newValue ? newValue.code : '') }}
                required
            />,

            // Financial Year Beginning
            <GridInput
                key={'6'}
                formik={formik}
                name={'financial_year_beginning'}
                type='date'
                required
            />,
        ],
        [
            // GST Details Title
            <Grid key={'7'} item md={12} container justifyContent="center" alignItems="center">
                <span style={{ fontWeight: 'bold', textAlign: 'center' }}>GST Details</span>
            </Grid>,

            // GST Registered
            <GridInputSelect
                key={'08'}
                formik={formik}
                name={'supply_type'}
                options={[
                    {
                        id: 'goods',
                        name: 'Goods'
                    },
                    {
                        id: 'services',
                        name: 'Services'
                    },
                ]}
                required
            />,

            <GridInputSelect
                key={'8'}
                formik={formik}
                name={'registration_status'}
                options={[
                    {
                        id: true,
                        name: 'Yes'
                    },
                    {
                        id: false,
                        name: 'No'
                    }
                ]}
                required
            />,

            // Registration Type
            formik.values.registration_status && (
                <GridInputSelect
                    key={'9'}
                    formik={formik}
                    name={'gst_details.default.registration_type'}
                    label={'Registration Type'}
                    options={[
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
                    ]}
                    required
                />
            ),

            // Assessee of Other Territory
            formik.values.registration_status && (
                <GridInputSelect
                    key={'10'}
                    formik={formik}
                    name={'gst_details.default.assessee_of_other_territory'}
                    label={'Assessee of Other Territory'}
                    options={[
                        {
                            id: true,
                            name: 'Yes'
                        },
                        {
                            id: false,
                            name: 'No'
                        }
                    ]}
                    required
                />
            ),

            // 222
            // GSTIn/UIN
            formik.values.registration_status && (
                <GridInput
                    key={'11'}
                    formik={formik}
                    name={'gst_details.default.gstin_uin'}
                    label={'GSTIN / UIN'}
                    required
                    params={{
                        inputProps: {
                            pattern: '.{15}',
                            title: 'GSTIN/UIN should be 15 characters.',
                            onChange: (e) => {
                                const gstNumber = e.target.value;
                                formik.setFieldValue('gst_details.default.pan_number', gstNumber.slice(2, -3));
                            }
                        },
                    }}
                    md={formik.values.gst_details.default.gstin_uin.length == 15 ? 3 : 4}
                />
            ),

            // Verify GST Button
            formik.values.registration_status && formik.values.gst_details.default.gstin_uin.length == 15 && (
                <Grid key={'27'} item md={1} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="Verify GST Number" arrow>
                        <Button
                            variant="outlined"
                            onClick={async () => {
                                try {
                                    const params = {
                                        gstin: formik.values.gst_details.default.gstin_uin,
                                    };

                                    const response = await axiosInstance.post('/call-api', {
                                        method: 'get',
                                        endpoint: '/public/search',
                                        params: params
                                    });

                                    if (response.data.status_cd === "1") {
                                        toast(response.data.status_desc + ': ' + response.data.data.lgnm)
                                    } else {
                                        toast.error(response.data.error.message);
                                    }
                                } catch {
                                    toast.error('Error while verify GST number')
                                }
                            }}
                            type="button"
                        >
                            Verify
                        </Button>
                    </Tooltip>
                </Grid>
            ),

            // PAN Number
            formik.values.registration_status && (
                <GridInput
                    key={'12'}
                    formik={formik}
                    name={'gst_details.default.pan_number'}
                    label={'PAN Number'}
                    required
                    params={{
                        inputProps: {
                            pattern: '.{10}',
                            title: 'PAN number should be 10 characters.'
                        }
                    }}
                />
            ),

            // Periodicity
            formik.values.registration_status && (
                <GridInputSelect
                    key={'13'}
                    formik={formik}
                    name={'gst_details.default.periodicity'}
                    label={'Periodicity'}
                    options={[
                        {
                            id: 'monthly',
                            name: 'Monthly'
                        },
                        {
                            id: 'quarterly',
                            name: 'Quarterly'
                        }
                    ]}
                    required
                />
            ),

            // E-Way Bill Details Title
            formik.values.registration_status && (
                <Grid key={'14'} item md={12} container justifyContent="center" alignItems="center" mt={2}>
                    <span style={{ fontWeight: 'bold', textAlign: 'center' }}>E-Way Bill Details</span>
                </Grid>
            ),

            // e-Way Bill Applicable
            formik.values.registration_status && (
                <GridInputSelect
                    key={'15'}
                    formik={formik}
                    name={'gst_details.default.e_way_bill_applicable'}
                    label={'e-Way Bill Applicable'}
                    options={[
                        {
                            id: true,
                            name: 'Yes'
                        },
                        {
                            id: false,
                            name: 'No'
                        }
                    ]}
                    required
                />
            ),

            // e-Way Bill Applicable From
            formik.values.registration_status && formik.values.gst_details.default.e_way_bill_applicable && (
                <GridInput
                    key={'16'}
                    formik={formik}
                    name={'gst_details.default.e_way_bill_applicable_from'}
                    label={'e-Way Bill Applicable From'}
                    type='date'
                    required
                />
            ),

            // e-Way Bill Applicable for Intrastate
            formik.values.registration_status && formik.values.gst_details.default.e_way_bill_applicable && (
                <GridInputSelect
                    key={'17'}
                    formik={formik}
                    name={'gst_details.default.e_way_bill_applicable_for_intrastate'}
                    label={'e-Way Bill Applicable for Intrastate'}
                    options={[
                        {
                            id: true,
                            name: 'Yes'
                        },
                        {
                            id: false,
                            name: 'No'
                        }
                    ]}
                    required
                />
            ),

            // E-Invoice Details Title
            formik.values.registration_status && formik.values.gst_details.default.registration_type == 'regular' && (
                <Grid key={'18'} item md={12} container justifyContent="center" alignItems="center" mt={2}>
                    <span style={{ fontWeight: 'bold', textAlign: 'center' }}>E-Invoice Details</span>
                </Grid>
            ),

            // e-Invoicing Applicable
            formik.values.registration_status && formik.values.gst_details.default.registration_type == 'regular' && (
                <GridInputSelect
                    key={'19'}
                    formik={formik}
                    name={'gst_details.default.e_invoicing_applicable'}
                    label={'e-Invoicing Applicable'}
                    options={[
                        {
                            id: true,
                            name: 'Yes'
                        },
                        {
                            id: false,
                            name: 'No'
                        }
                    ]}
                    required
                />
            ),

            // e-Invoicing Applicable From
            formik.values.registration_status && formik.values.gst_details.default.registration_type == 'regular' && formik.values.gst_details.default.e_invoicing_applicable && (
                <GridInput
                    key={'20'}
                    formik={formik}
                    name={'gst_details.default.e_invoicing_applicable_from'}
                    label={'e-Invoicing Applicable From'}
                    type='date'
                    required
                />
            ),

            // Invoice Bill From Place
            formik.values.registration_status && formik.values.gst_details.default.registration_type == 'regular' && formik.values.gst_details.default.e_invoicing_applicable && (
                <GridInput
                    key={'21'}
                    formik={formik}
                    name={'gst_details.default.invoice_bill_from_place'}
                    label={'Invoice Bill From Place'}
                    required
                />
            ),

            // TAX Details Title
            formik.values.registration_status && formik.values.gst_details.default.registration_type == 'composition' && (
                <Grid key={'22'} item md={12} container justifyContent="center" alignItems="center" mt={2}>
                    <span style={{ fontWeight: 'bold', textAlign: 'center' }}>TAX Details</span>
                </Grid>
            ),

            // Tax Rate
            formik.values.registration_status && formik.values.gst_details.default.registration_type == 'composition' && (
                <GridInput
                    key={'23'}
                    formik={formik}
                    name={'gst_details.default.tax_rate'}
                    label={'Tax Rate'}
                    required
                />
            ),

            // Tax Calculation Type
            formik.values.registration_status && formik.values.gst_details.default.registration_type == 'composition' && (
                <GridInputSelect
                    key={'24'}
                    formik={formik}
                    name={'gst_details.default.tax_calculation_type'}
                    label={'Tax Calculation Type'}
                    options={[
                        {
                            id: 'taxable_exempt_and_nil_rated_values',
                            name: 'Taxable, Exempt, & Nil Rated Values'
                        },
                        {
                            id: 'taxable_value',
                            name: 'Taxable Value'
                        }
                    ]}
                    required
                />
            ),

            // Multiple GST Details Title
            formik.values.registration_status && (
                <Grid key={'25'} item md={12} container justifyContent="center" alignItems="center" mt={2}>
                    <span style={{ fontWeight: 'bold', textAlign: 'center' }}>Multiple GST Details</span>
                </Grid>
            ),

            // ***
            // Multiple GST
            formik.values.registration_status && (
                <GridInputSelect
                    key={'26'}
                    formik={formik}
                    name={'multiple_gst'}
                    label={'Multiple GST?'}
                    options={[
                        {
                            id: true,
                            name: 'Yes'
                        },
                        {
                            id: false,
                            name: 'No'
                        }
                    ]}
                    required
                    md={formik.values.multiple_gst ? 3 : 4}
                />
            ),

            // Multiple GST Add Button
            formik.values.registration_status && formik.values.multiple_gst && (
                <Grid key={'27'} item md={1} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="Add GST Details" arrow>
                        <ButtonBase sx={{ borderRadius: '12px', marginX: 1 }}>
                            <Avatar
                                variant="rounded"
                                sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    transition: 'all .2s ease-in-out',
                                    background: theme.palette.secondary.light,
                                    color: theme.palette.secondary.dark,
                                    '&[aria-controls="menu-list-grow"],&:hover': {
                                        background: theme.palette.secondary.dark,
                                        color: theme.palette.secondary.light
                                    }
                                }}
                                onClick={() => {
                                    setMultipleGSTDialog(true)
                                }}
                                color="inherit"
                            >
                                <IconSquareRoundedPlus stroke={1.5} size="1.3rem" />
                            </Avatar>
                        </ButtonBase>
                    </Tooltip>
                </Grid>
            ),

            // Multiple GST Modal
            formik.values.registration_status && formik.values.multiple_gst && (
                <Grid key={'28'}>
                    <Dialog open={multipleGSTDialog} maxWidth="md" fullWidth style={{ margin: '20px' }}>
                        <DialogTitle borderBottom={`1px solid ${theme.palette.secondary[800]}`}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" fontSize="1.3rem" fontWeight="bold">
                                <Box width={'100%'} textAlign={'center'}>
                                    <span>GST</span>
                                </Box>
                                <Tooltip title="Close" arrow>
                                    <ButtonBase sx={{ borderRadius: '12px', marginX: 1 }}>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.mediumAvatar,
                                                transition: 'all .2s ease-in-out',
                                                background: theme.palette.secondary.light,
                                                color: theme.palette.secondary.dark,
                                                '&[aria-controls="menu-list-grow"],&:hover': {
                                                    background: theme.palette.secondary.dark,
                                                    color: theme.palette.secondary.light
                                                }
                                            }}
                                            onClick={() => {
                                                setMultipleGSTDialog(false);
                                            }}
                                            color="inherit"
                                        >
                                            <IconSquareRoundedX stroke={1.5} size="1.3rem" />
                                        </Avatar>
                                    </ButtonBase>
                                </Tooltip>
                            </Box>
                        </DialogTitle>

                        <DialogContent style={{ borderBottom: `1px solid $theme.palette.secondary[800]` }}>
                            <Grid container spacing={2} my={2}>
                                {
                                    multipleGSTDialog && Object.entries(formik.values.gst_details).filter((item) => !['default', 'reset'].includes(item[0])).sort((a, b) => (a[0].includes('tmp') ? -1 : a[0].localeCompare(b[0]))).map(([key], index) => (
                                        <Grid container key={index} spacing={2} mt={1} p={2}>
                                            {
                                                key !== 'tmp' && <Grid key={index + '-1'} item md={12}>
                                                    <hr />
                                                </Grid>
                                            }
                                            {
                                                // Registration Type
                                                <GridInputSelect
                                                    key={index + 'modal-9'}
                                                    formik={formik}
                                                    name={`gst_details.${key}.registration_type`}
                                                    label={'Registration Type'}
                                                    options={[
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
                                                    ]}
                                                    required
                                                />
                                            }
                                            {
                                                // State
                                                (
                                                    <GridAutoComplete
                                                        key={index + 'modal-state'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.state`}
                                                        label={'State'}
                                                        options={states}
                                                        getOptionLabel={(option) => option.name}
                                                        getValue={states.find((state) => state.id == formik.values.gst_details[key].state) || null}
                                                        onChange={(event, newValue) => { formik.setFieldValue(`gst_details.${key}.state`, newValue ? newValue.id : '') }}
                                                        required
                                                    />
                                                )
                                            }

                                            {
                                                // Assessee of Other Territory
                                                (
                                                    <GridInputSelect
                                                        key={index + 'modal-10'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.assessee_of_other_territory`}
                                                        label={'Assessee of Other Territory'}
                                                        options={[
                                                            {
                                                                id: true,
                                                                name: 'Yes'
                                                            },
                                                            {
                                                                id: false,
                                                                name: 'No'
                                                            }
                                                        ]}
                                                        required
                                                    />
                                                )
                                            }

                                            {
                                                // GSTIn/UIN
                                                (
                                                    <GridInput
                                                        key={index + 'modal-11'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.gstin_uin`}
                                                        label={'GSTIN / UIN'}
                                                        required
                                                        params={{
                                                            inputProps: {
                                                                pattern: '.{15}',
                                                                title: 'GSTIN/UIN should be 15 characters.',
                                                                onChange: (e) => {
                                                                    const gstNumber = e.target.value;
                                                                    formik.setFieldValue(`gst_details.${key}.pan_number`, gstNumber.slice(2, -3));
                                                                }
                                                            }
                                                        }}
                                                        md={formik.values.gst_details[key].gstin_uin.length == 15 ? 3 : 4}
                                                    />
                                                )
                                            }

                                            {
                                                // 111
                                                // Verify GST Button
                                                formik.values.gst_details[key].gstin_uin.length == 15 && (
                                                    <Grid key={'27'} item md={1} style={{ display: 'flex', justifyContent: 'center' }}>
                                                        <Tooltip title="Verify GST Number" arrow>
                                                            <Button
                                                                variant="outlined"
                                                                onClick={async () => {
                                                                    try {
                                                                        const params = {
                                                                            gstin: formik.values.gst_details.default.gstin_uin,
                                                                        };

                                                                        const response = await axiosInstance.post('/call-api', {
                                                                            method: 'get',
                                                                            endpoint: '/public/search',
                                                                            params: params
                                                                        });

                                                                        if (response.data.status_cd === "1") {
                                                                            toast(response.data.status_desc + ': ' + response.data.data.lgnm)
                                                                        } else {
                                                                            toast.error(response.data.error.message);
                                                                        }
                                                                    } catch {
                                                                        toast.error('Error while verify GST number')
                                                                    }
                                                                }}
                                                                type="button"
                                                            >
                                                                Verify
                                                            </Button>
                                                        </Tooltip>
                                                    </Grid>
                                                )
                                            }

                                            {
                                                // PAN Number
                                                (
                                                    <GridInput
                                                        key={index + 'modal-12'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.pan_number`}
                                                        label={'PAN Number'}
                                                        required
                                                        params={{
                                                            inputProps: {
                                                                pattern: '.{10}',
                                                                title: 'PAN number should be 10 characters.'
                                                            }
                                                        }}
                                                    />
                                                )
                                            }

                                            {
                                                // Periodicity
                                                (
                                                    <GridInputSelect
                                                        key={index + 'modal-13'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.periodicity`}
                                                        label={'Periodicity'}
                                                        options={[
                                                            {
                                                                id: 'monthly',
                                                                name: 'Monthly'
                                                            },
                                                            {
                                                                id: 'quarterly',
                                                                name: 'Quarterly'
                                                            }
                                                        ]}
                                                        required
                                                    />
                                                )
                                            }

                                            {
                                                // E-Way Bill Details Title
                                                (
                                                    <Grid key={index + 'modal-14'} item md={12} container justifyContent="center" alignItems="center" mt={2}>
                                                        <span style={{ fontWeight: 'bold', textAlign: 'center' }}>E-Way Bill Details</span>
                                                    </Grid>
                                                )
                                            }

                                            {
                                                // e-Way Bill Applicable
                                                (
                                                    <GridInputSelect
                                                        key={index + 'modal-15'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.e_way_bill_applicable`}
                                                        label={'e-Way Bill Applicable'}
                                                        options={[
                                                            {
                                                                id: true,
                                                                name: 'Yes'
                                                            },
                                                            {
                                                                id: false,
                                                                name: 'No'
                                                            }
                                                        ]}
                                                        required
                                                    />
                                                )
                                            }

                                            {
                                                // e-Way Bill Applicable From
                                                formik.values.gst_details[key].e_way_bill_applicable && (
                                                    <GridInput
                                                        key={index + 'modal-16'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.e_way_bill_applicable_from`}
                                                        label={'e-Way Bill Applicable From'}
                                                        type='date'
                                                        required
                                                    />
                                                )
                                            }

                                            {
                                                // e-Way Bill Applicable for Intrastate
                                                formik.values.gst_details[key].e_way_bill_applicable && (
                                                    <GridInputSelect
                                                        key={index + 'modal-17'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.e_way_bill_applicable_for_intrastate`}
                                                        label={'e-Way Bill Applicable for Intrastate'}
                                                        options={[
                                                            {
                                                                id: true,
                                                                name: 'Yes'
                                                            },
                                                            {
                                                                id: false,
                                                                name: 'No'
                                                            }
                                                        ]}
                                                        required
                                                    />
                                                )
                                            }

                                            {
                                                // E-Invoice Details Title
                                                formik.values.gst_details[key].registration_type == 'regular' && (
                                                    <Grid key={index + 'modal-18'} item md={12} container justifyContent="center" alignItems="center" mt={2}>
                                                        <span style={{ fontWeight: 'bold', textAlign: 'center' }}>E-Invoice Details</span>
                                                    </Grid>
                                                )
                                            }

                                            {
                                                // e-Invoicing Applicable
                                                formik.values.gst_details[key].registration_type == 'regular' && (
                                                    <GridInputSelect
                                                        key={index + 'modal-19'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.e_invoicing_applicable`}
                                                        label={'e-Invoicing Applicable'}
                                                        options={[
                                                            {
                                                                id: true,
                                                                name: 'Yes'
                                                            },
                                                            {
                                                                id: false,
                                                                name: 'No'
                                                            }
                                                        ]}
                                                        required
                                                    />
                                                )
                                            }

                                            {
                                                // e-Invoicing Applicable From
                                                formik.values.gst_details[key].registration_type == 'regular' && formik.values.gst_details[key].e_invoicing_applicable && (
                                                    <GridInput
                                                        key={index + 'modal-20'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.e_invoicing_applicable_from`}
                                                        label={'e-Invoicing Applicable From'}
                                                        type='date'
                                                        required
                                                    />
                                                )
                                            }

                                            {
                                                // Invoice Bill From Place
                                                formik.values.gst_details[key].registration_type == 'regular' && formik.values.gst_details[key].e_invoicing_applicable && (
                                                    <GridInput
                                                        key={index + 'modal-21'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.invoice_bill_from_place`}
                                                        label={'Invoice Bill From Place'}
                                                        required
                                                    />
                                                )
                                            }

                                            {
                                                // TAX Details Title
                                                formik.values.gst_details[key].registration_type == 'composition' && (
                                                    <Grid key={index + 'modal-22'} item md={12} container justifyContent="center" alignItems="center" mt={2}>
                                                        <span style={{ fontWeight: 'bold', textAlign: 'center' }}>TAX Details</span>
                                                    </Grid>
                                                )
                                            }

                                            {
                                                // Tax Rate
                                                formik.values.gst_details[key].registration_type == 'composition' && (
                                                    <GridInput
                                                        key={index + 'modal-23'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.tax_rate`}
                                                        label={'Tax Rate'}
                                                        required
                                                    />
                                                )
                                            }

                                            {
                                                // Tax Calculation Type
                                                formik.values.gst_details[key].registration_type == 'composition' && (
                                                    <GridInputSelect
                                                        key={index + 'modal-24'}
                                                        formik={formik}
                                                        name={`gst_details.${key}.tax_calculation_type`}
                                                        label={'Tax Calculation Type'}
                                                        options={[
                                                            {
                                                                id: 'taxable_exempt_and_nil_rated_values',
                                                                name: 'Taxable, Exempt, & Nil Rated Values'
                                                            },
                                                            {
                                                                id: 'taxable_value',
                                                                name: 'Taxable Value'
                                                            }
                                                        ]}
                                                        required
                                                    />
                                                )
                                            }
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <DialogTitle>
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            type="button"
                                            onClick={() => {
                                                setMultipleGSTDialog(false)
                                                formik.setFieldValue(`gst_details.${getMaxObjectKey(formik.values.gst_details) + 1}`, formik.values.gst_details.tmp)
                                                formik.setFieldValue(`gst_details.tmp`, formik.values.gst_details.reset)
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            type="button"
                                            onClick={() => {
                                                setMultipleGSTDialog(false)
                                            }}
                                        >
                                            Close
                                        </Button>
                                    </Grid>
                                </Grid>
                            </DialogTitle>
                        </DialogActions>
                    </Dialog>
                </Grid>
            ),
        ],
        [
            // CIN Number
            formik.values.registration_status && (
                <GridInput
                    key={'25'}
                    formik={formik}
                    name={'cin_number'}
                    label={'CIN Number'}
                />
            ),

            // TAN Number
            formik.values.registration_status && (
                <GridInput
                    key={'26'}
                    formik={formik}
                    name={'tan_number'}
                    label={'TAN Number'}
                />
            )
        ],
        [
            // Bank Name
            <GridInput
                key={'27'}
                formik={formik}
                name={'bank_name'}
                autoFocus
                required
            />,

            // Account Holder Name
            <GridInput
                key={'28'}
                formik={formik}
                name={'account_holder_name'}
                required
            />,

            // Account Number
            <GridInput
                key={'29'}
                formik={formik}
                name={'account_number'}
                required
            />,

            // IFSC Code
            <GridInput
                key={'30'}
                formik={formik}
                name={'bank_ifsc'}
                label={'IFSC Code'}
                required
            />,

            // Swift Code
            <GridInput
                key={'31'}
                formik={formik}
                name={'bank_swift'}
                label={'Swift Code'}
                required
            />,

            // Branch Name
            <GridInput
                key={'32'}
                formik={formik}
                name={'bank_branch'}
                label={'Branch Name'}
                required
            />,

            // Bank Address
            <GridInput
                key={'33'}
                formik={formik}
                name={'bank_address'}
                label={'Bank Address'}
                required
                params={{
                    multiline: true,
                    rows: 3
                }}
            />,

            // Bank GST
            <GridInput
                key={'34'}
                formik={formik}
                name={'bank_gst'}
                label={'Bank GST'}
                params={{
                    inputProps: {
                        pattern: '.{15}',
                        title: 'GST number should be 15 characters.'
                    }
                }}
            />,

            // Bank Opening Balance
            <GridInput
                key={'35'}
                formik={formik}
                name={'bank_opening_balance'}
                required
            />,

            // Bank Balance Type
            <GridInputSelect
                key={'36'}
                formik={formik}
                name={'bank_balance_type'}
                options={[
                    {
                        id: 'CR',
                        name: 'CR (Credit)'
                    },
                    {
                        id: 'DR',
                        name: 'DR (Debit)'
                    }
                ]}
                required
            />,

            // Print in Invoice
            <GridInputSelect
                key={'37'}
                formik={formik}
                name={'print_in_invoice'}
                label={'Print in Invoice'}
                options={[
                    {
                        id: true,
                        name: 'Yes'
                    },
                    {
                        id: false,
                        name: 'No'
                    }
                ]}
                required
            />,
        ]
    ];

    const sectionTitles = [
        addCompanyDialog ? 'Company Creation' : 'Alter Company',
        'Statutory Details',
        'Additional Details',
        'Bank Details'
    ];

    return (
        <>
            <Box mx={2} width={250} display="flex" alignItems="center" justifyContent="center">
                <Formik
                    initialValues={{
                        company: currentCompany != null ? currentCompany.id : ''
                    }}
                    enableReinitialize
                >
                    {({ handleChange, values }) => (
                        <FormControl fullWidth>
                            <InputLabel id="company-label">Company</InputLabel>
                            <Select
                                labelId="company-label"
                                id="company"
                                name="company"
                                value={values.company}
                                onChange={(e) => {
                                    handleChange(e);
                                    const companyId = e.target.value;
                                    setCurrentCompany(companies.find((company) => company.id == companyId));
                                }}
                                label="Company"
                                fullWidth
                                onOpen={() => setIsCompanySelectOpen(true)}
                                onClose={() => setIsCompanySelectOpen(false)}
                            >
                                {companies.map((comp) => {
                                    const company = Object.fromEntries(
                                        Object.entries(comp).map(([key, value]) => {
                                            return [key, value != null ? value : ''];
                                        })
                                    );
                                    return (
                                        <MenuItem key={company.id} value={company.id}>
                                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} width={'100%'}>
                                                {/* <span>{company.name.slice(0, company.name.length)}</span> */}
                                                <span>
                                                    {company.name.length > 20
                                                        ? isCompanySelectOpen
                                                            ? company.name
                                                            : company.name.substring(0, 20) + '...'
                                                        : company.name}
                                                </span>
                                                <Settings
                                                    stroke={1}
                                                    size="0.8rem"
                                                    style={{ display: isCompanySelectOpen ? null : 'none' }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();

                                                        setAddCompanyDialog(false);
                                                        setEditCompanyDialog(true);

                                                        // 888
                                                        // setIsGSTRegistered(company.registration_status);
                                                        // setRegistrationType(company.registration_type);
                                                        // setIsEWayBillApplicable(company.e_way_bill_applicable);
                                                        // setIsEInvoicingApplicable(company.e_invoicing_applicable);

                                                        formik.resetForm({
                                                            values: {
                                                                ...(company ? getCompany(company) : {})
                                                            }
                                                        });
                                                    }}
                                                />
                                            </Box>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    )}
                </Formik>
                <Tooltip title="Add company" arrow>
                    <ButtonBase sx={{ borderRadius: '12px', marginX: 1 }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.secondary.light,
                                color: theme.palette.secondary.dark,
                                '&[aria-controls="menu-list-grow"],&:hover': {
                                    background: theme.palette.secondary.dark,
                                    color: theme.palette.secondary.light
                                }
                            }}
                            onClick={() => {
                                setAddCompanyDialog(true);
                                setEditCompanyDialog(false);
                            }}
                            color="inherit"
                        >
                            <IconSquareRoundedPlus stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ButtonBase>
                </Tooltip>

                <Dialog open={addCompanyDialog || editCompanyDialog} maxWidth="lg" fullWidth>
                    <DialogTitle borderBottom={`1px solid ${theme.palette.secondary[800]}`}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" fontSize="1.3rem" fontWeight="bold">
                            <Box width={'100%'} textAlign={'center'}>
                                <span>{sectionTitles[currentSection]}</span>
                            </Box>
                            <Tooltip title="Close" arrow>
                                <ButtonBase sx={{ borderRadius: '12px', marginX: 1 }}>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.mediumAvatar,
                                            transition: 'all .2s ease-in-out',
                                            background: theme.palette.secondary.light,
                                            color: theme.palette.secondary.dark,
                                            '&[aria-controls="menu-list-grow"],&:hover': {
                                                background: theme.palette.secondary.dark,
                                                color: theme.palette.secondary.light
                                            }
                                        }}
                                        onClick={() => {

                                            setAddCompanyDialog(false);
                                            setEditCompanyDialog(false);
                                            // setCurrentSection(0)
                                        }}
                                        color="inherit"
                                    >
                                        <IconSquareRoundedX stroke={1.5} size="1.3rem" />
                                    </Avatar>
                                </ButtonBase>
                            </Tooltip>
                        </Box>
                    </DialogTitle>

                    <form onSubmit={formik.handleSubmit} ref={formRef}>
                        <DialogContent style={{ borderBottom: `1px solid $theme.palette.secondary[800] ` }}>
                            <Grid container spacing={2} my={2}>
                                {/* Sections */}
                                {sections[currentSection]}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <DialogTitle>
                                <Grid container spacing={2}>
                                    {currentSection > 0 && (
                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    setCurrentSection(currentSection - (currentSection == 3 && !formik.values.registration_status ? 2 : 1))
                                                }}
                                                type="button"
                                            >
                                                Prev
                                            </Button>
                                        </Grid>
                                    )}
                                    {sections && currentSection + 1 != sections?.length && (
                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                onClick={() => {
                                                    if (formRef.current.reportValidity()) {
                                                        setCurrentSection(currentSection + (currentSection == 1 && !formik.values.registration_status ? 2 : 1))
                                                    }
                                                }}
                                                type="button"
                                            >
                                                Next
                                            </Button>
                                        </Grid>
                                    )}
                                    {
                                        <Grid item>
                                            <Button
                                                variant="outlined"
                                                type="submit"
                                                style={{ display: sections && currentSection + 1 != sections?.length ? 'none' : '' }}
                                                disabled={formik.isSubmitting}
                                            >
                                                {addCompanyDialog && 'Save'}
                                                {editCompanyDialog && 'Update'}
                                            </Button>
                                        </Grid>
                                    }
                                </Grid>
                            </DialogTitle>
                        </DialogActions>
                    </form>
                </Dialog>
            </Box>
        </>
    );
}
