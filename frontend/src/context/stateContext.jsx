import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";

export const State = createContext();
const uuid = Math.random().toString(36).substring(2, 7);

export default function StateContext({ children }) {
  const [name, setName] = useState("Digante");
  const [address, setAddress] = useState("Amarpur");
  const [email, setEmail] = useState("digante@gmail.com");
  const [phone, setPhone] = useState("9831088909");
  const [bankName, setBankName] = useState("Axis Bank");
  const [bankAccount, setBankAccount] = useState("1234567890");
  const [website, setWebsite] = useState("nexawings.com");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientList, setClientList] = useState([]);
  const [selectClient, setSelectClient] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(uuid);
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [width] = useState(641);
  // const [invoices, setInvoices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience");
    }
  }, [width]);

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !quantity || !price) {
      toast.error("Please fill in all inputs");
    } else {
      const newItems = {
        id: uuidv4(),
        description,
        quantity,
        price,
        discountType,
        discountAmount,
        amount,
      };
      setDescription("");
      setQuantity("");
      setPrice("");
      setDiscountType("");
      setDiscountAmount("");
      setAmount("");
      setList([...list, newItems]);
      setIsEditing(false);
    }
  };

  // Add client function
  const addClient = (e) => {
    e.preventDefault();

    if (!clientName || !clientAddress) {
      toast.error("Please fill in all inputs");
    } else {
      const newClient = {
        id: uuidv4(),
        clientName,
        clientAddress,
      };

      setClientName("");
      setClientAddress("");
      setClientList([...clientList, newClient]);

      toast.success("New client added");
    }
  };

  const currentClient = (e) => {
    setSelectClient(e.target.value);
    clientList.map((client) => {
      if (client.id === e.target.value) {
        setClientName(client.clientName);
        setClientAddress(client.clientAddress);
      }
    });
  };

  // Calculate items amount with discount function
  useEffect(() => {
    const calculateAmount = () => {
      if (discountType === "percentage") {
        setAmount(quantity * price - (discountAmount / 100) * quantity * price);
      } else if (discountType === "absolute") {
        setAmount(quantity * price - discountAmount);
      } else {
        setAmount(quantity * price);
      }
    };

    calculateAmount();
  }, [amount, price, quantity, discountType, discountAmount]);

  /* Calculate total amount of items in table
  This is the previous function to calculate the total amount of items in the table
  But it has a bug where if you delete an item from the table, it still keeps the previous total amount.
  The function after this comment uses `collect.js` which is a much better solution.  
  */
  // function CalcSum() {
  //   let rows = document.querySelectorAll(".amount");
  //   let sum = 0;

  //   for (let i = 0; i < rows.length; i++) {
  //     if (rows[i].className === "amount") {
  //       sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML);
  //       setTotal(sum);
  //     }
  //   }
  // }

  // useEffect(() => {
  //   CalcSum();
  // }, [price, quantity]);

  // Use collect.js to calculate the total amount of items in the table. This is a much better function than the commented one above.
  const calculateTotal = () => {
    const allItems = list.map((item) => item.price);

    setTotal(collect(allItems).sum());
  };

  useEffect(() => {
    calculateTotal();
  });

  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id !== id));
    setIsEditing(true);
    setDescription(editingRow.description);
    setQuantity(editingRow.quantity);
    setPrice(editingRow.price);
    setDiscountType(editingRow.discountType);
    setDiscountAmount(editingRow.discountAmount);
  };

  // Delete function
  const deleteRow = (id) => {
    setList(list.filter((row) => row.id !== id));
    // CalcSum();
    setShowModal(false);
  };

  const context = {
    name,
    setName,
    address,
    setAddress,
    email,
    setEmail,
    phone,
    setPhone,
    bankName,
    setBankName,
    bankAccount,
    setBankAccount,
    website,
    setWebsite,
    clientName,
    setClientName,
    clientAddress,
    setClientAddress,
    clientList,
    setClientList,
    selectClient,
    setSelectClient,
    invoiceNumber,
    setInvoiceNumber,
    invoiceDate,
    setInvoiceDate,
    dueDate,
    setDueDate,
    notes,
    setNotes,
    description,
    setDescription,
    quantity,
    setQuantity,
    price,
    setPrice,
    amount,
    setAmount,
    discountType,
    setDiscountType,
    discountAmount,
    setDiscountAmount,
    list,
    setList,
    total,
    setTotal,
    width,
    componentRef,
    handlePrint,
    isEditing,
    setIsEditing,
    showModal,
    setShowModal,
    handleSubmit,
    addClient,
    currentClient,
    editRow,
    deleteRow,
    showLogoutModal,
    setShowLogoutModal,
  };

  return <State.Provider value={context}>{children}</State.Provider>;
}
