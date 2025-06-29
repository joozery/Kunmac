import { FiMail } from "react-icons/fi";

const mockContacts = [
  { id: 1, name: "สมชาย", email: "somchai@email.com", message: "สอบถามราคา" },
  { id: 2, name: "Jane", email: "jane@email.com", message: "ขอใบเสนอราคา" },
];

export default function ContactsManager() {
  return (
    <div className="w-full px-4 md:px-8">
      <div className="flex items-center justify-between mb-8 px-4 md:px-8">
        <div className="flex items-center gap-3">
          <FiMail className="text-3xl text-blue-700" />
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800 tracking-tight">ข้อความติดต่อ</h1>
        </div>
      </div>
      <div className="bg-white rounded-3xl shadow-xl w-full p-0 border border-blue-50 mb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4 md:px-8 pt-8 pb-4">
          <div className="font-bold text-xl text-blue-700">รายการข้อความ</div>
        </div>
        <div className="overflow-x-auto px-4 md:px-8 pb-8">
          <table className="w-full bg-white text-base">
            <thead>
              <tr className="bg-blue-50 text-blue-700">
                <th className="py-4 px-4 md:px-8 text-left font-bold">ชื่อ</th>
                <th className="py-4 px-4 md:px-8 text-left font-bold">อีเมล</th>
                <th className="py-4 px-4 md:px-8 text-left font-bold">ข้อความ</th>
              </tr>
            </thead>
            <tbody>
              {mockContacts.map(contact => (
                <tr key={contact.id} className="border-b last:border-b-0 hover:bg-blue-50/60 transition group">
                  <td className="py-4 px-4 md:px-8 text-blue-900 font-semibold max-w-xs truncate group-hover:text-blue-700">{contact.name}</td>
                  <td className="py-4 px-4 md:px-8 text-gray-700">{contact.email}</td>
                  <td className="py-4 px-4 md:px-8 text-gray-700">{contact.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 