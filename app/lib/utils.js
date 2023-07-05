import { toast } from "react-hot-toast";

export function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
  
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
  
    document.body.appendChild(textarea);
  
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
  
    document.execCommand('copy');
  
    document.body.removeChild(textarea);
    toast.success(`You copied: ${text}`)
  }
  