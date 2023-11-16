import React from 'react';
const rtl = { direction: 'rtl' } as const;

export default function NoPremmisionsDialog() {
  return (
    <dialog open id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg" style={rtl}>
          הרשאות מיקום
        </h3>
        <p className="py-4 " style={rtl}>
          בבקשה אשר הרשאות מיקום לאתר זה
        </p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">הבנתי</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
