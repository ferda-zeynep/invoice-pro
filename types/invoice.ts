export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  clientCompany: string;
  issueDate: string;
  dueDate: string;
  status: "Paid" | "Pending";
  items: InvoiceItem[];
  totalAmount: number;
}
