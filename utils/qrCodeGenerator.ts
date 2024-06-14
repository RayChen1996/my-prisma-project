import QRCode from "qrcode";

export const generateQrCode = (data: string) => {
  return QRCode.toDataURL(data, { errorCorrectionLevel: "H" });
};
