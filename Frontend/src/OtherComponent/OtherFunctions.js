
const NumberToWords = (number) => {
    let num = parseInt(number.toString().split(".")[0]);
    if (num === 0) {
        return "Zero Rupees Only";
    }

    const units = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
    ];
    const teens = [
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
    ];
    const tens = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
    ];

    const convert = (num) => {
        if (num <= 10 && num !== 0) return units[num];
        if (num < 20) return teens[num - 11];
        if (num < 100)
            return (
                tens[Math.floor(num / 10)] +
                (num % 10 !== 0 ? " " + units[num % 10] : "")
            );
        if (num < 1000)
            return (
                units[Math.floor(num / 100)] +
                " Hundred" +
                (num % 100 !== 0 ? " and " + convert(num % 100) : "")
            );
        if (num < 100000)
            return (
                convert(Math.floor(num / 1000)) +
                " Thousand" +
                (num % 1000 !== 0 ? " and " + convert(num % 1000) : "")
            );
        if (num < 10000000)
            return (
                convert(Math.floor(num / 100000)) +
                " Lakh" +
                (num % 100000 !== 0 ? " and " + convert(num % 100000) : "")
            );
    };

    return convert(num) + " Rupees  Only";
};
const handleKeyDownText = (e) => {
    const allowedKeys = [
      "Backspace", 
      "Delete", 
      "ArrowLeft", 
      "ArrowRight", 
      "Tab", 
      "Shift", 
      "CapsLock", 
      " " // Allow space
    ];
  
    // Check if the key pressed is a letter or one of the allowed keys
    const isLetter = (key) => /^[a-zA-Z]+$/.test(key);
  
    if (!isLetter(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };
  const handleKeyDownTextRegistration= (e) => {
    // Define allowed keys
    const allowedKeys = [
      "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Shift", "Control", "Alt", "Enter", "Meta"
    ];
  
    // Allow letters (A-Z, a-z), space, and allowed keys
    const isAllowedCharacter = /^[A-Za-z\s]+$/.test(e.key) || allowedKeys.includes(e.key);
  
    if (!isAllowedCharacter) {
      e.preventDefault();
    }
  };
  
  const handleKeyDownPhoneNo = (e) => {
    const allowedKeys = [
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
      "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"
    ];
  
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };
  
  
  
const formatLabel = (label) => {

    if (/[a-z]/.test(label) && /[A-Z]/.test(label) && !/\d/.test(label)) {
      return label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/^./, (str) => str.toUpperCase());
    } else {
      return label;
    }
  };
  const BlockInvalidcharecternumber = (e) => {
    if (['e', 'E', '+', '-','ArrowUp','ArrowDown'].includes(e.key)) {
        e.preventDefault()
    }
}



export { NumberToWords, BlockInvalidcharecternumber ,formatLabel,handleKeyDownText,handleKeyDownPhoneNo,handleKeyDownTextRegistration};


// Example usage in an input element:
{/* <input type="text" onKeyDown={handleKeyDown} /> */}


