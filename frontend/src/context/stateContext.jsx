import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import collect from "collect.js";
import { account, databases, ID, Query } from "./appwrite";

export const State = createContext();
const uuid = Math.random().toString().substring(2, 7);

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
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");
  const [finalDiscountType, setFinalDiscountType] = useState("");
  const [finalDiscountAmount, setFinalDiscountAmount] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [width] = useState(641);
  // const [invoices, setInvoices] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState(null);
  const databaseId = "66594e19000ac703768e";
  const collectionId = "66594ef800375eb212c4";

  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    if (window.innerWidth < width) {
      alert("Place your phone in landscape mode for the best experience");
    }
  }, [width]);

  async function init() {
    try {
      const loggedIn = await account.get();
      setUser(loggedIn);
    } catch (err) {
      setUser(null);
    }
  }

  useEffect(() => {
    init();
  }, []);

  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!itemName || !description || !quantity || !price) {
      toast.error("Please fill in all inputs");
    } else {
      const newItems = {
        id: uuidv4(),
        itemName,
        description,
        quantity,
        price,
        discountType,
        discountAmount,
        amount,
      };

      setItemName("");
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
  const addClient = async (e) => {
    e.preventDefault();

    if (!clientName || !clientAddress) {
      toast.error("Please fill in all inputs");
    } else {
      const newClient = {
        userId: user.$id,
        clientName,
        clientAddress,
      };

      await databases.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        newClient
      );

      setClientName("");
      setClientAddress("");

      const response = await databases.listDocuments(databaseId, collectionId, [
        Query.orderDesc(""),
        Query.limit(100),
      ]);
      setClientList(response.documents);

      toast.success("New client added");
    }
  };

  async function fetchClients() {
    const response = await databases.listDocuments(databaseId, collectionId, [
      Query.orderDesc(""),
      Query.limit(100),
    ]);
    setClientList(response.documents);
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const currentClient = (e) => {
    setSelectClient(e.target.value);
    clientList.map((client) => {
      if (client.$id === e.target.value) {
        setClientName(client.clientName);
        setClientAddress(client.clientAddress);
      }
    });
  };

  // Calculate items amount with discount function
  useEffect(() => {
    const calculateAmount = () => {
      if (discountType === "Percentage") {
        setAmount(quantity * price - (discountAmount / 100) * quantity * price);
      } else if (discountType === "Absolute") {
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
    const allItems = list.map((item) => item.amount);
    const total = collect(allItems).sum();

    if (finalDiscountType === "Percentage") {
      setTotal(total - (finalDiscountAmount / 100) * total);
    } else if (finalDiscountType === "Absolute") {
      setTotal(total - finalDiscountAmount);
    } else {
      setTotal(total);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [list, total, finalDiscountType, finalDiscountAmount]);

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
    itemName,
    setItemName,
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
    finalDiscountType,
    setFinalDiscountType,
    finalDiscountAmount,
    setFinalDiscountAmount,
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
    user,
    setUser,
  };

  return <State.Provider value={context}>{children}</State.Provider>;
}
