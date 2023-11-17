'use client';
import { useState, useCallback, useReducer, ChangeEvent } from 'react';
import { trpc } from '@trpcProviders/client';
import NoPremmisionsDialog from './NoPremmisionsDialog';

export default function GetLocationButton() {
  const [phoneValue, setPhoneValue] = useState('');
  const [infoValue, setInfoValue] = useState('');

  const addRescue = trpc.addRescue.useMutation();
  const me = trpc.getMe.useQuery(undefined, {
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [prmessions, setPrmessions] = useState(true);
  function rescueRequest() {
    navigator.geolocation.getCurrentPosition(
      position => {
        if (me.data)
          if (phoneValue.length > 6) {
            addRescue.mutate({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              userId: me.data.id,
              status: 'pending',
              timeStamp: new Date(),
              updatedAt: new Date(),
              phoneNumber: phoneValue,
              additionalInfo: infoValue,
            });
          }
        if (!prmessions) {
          setPrmessions(true);
        }
      },
      error => {
        if (error.code === error.PERMISSION_DENIED) {
          setPrmessions(false);
        }
      },
    );
  }

  if (!prmessions) {
    return (
      <>
        <NoPremmisionsDialog />
        <button
          onClick={() => {
            rescueRequest();
            //@ts-ignore
            document.getElementById('my_modal_1').showModal();
          }}
          className="btn w-52 h-52 rounded-full"
        >
          חשמל אותי
        </button>
        ;
      </>
    );
  }

  return (
    <>
      <div className="pt-6 form-control w-full max-w-xs">
        <label className="label">
          {phoneValue.length < 6 ? (
            <span className="label-text text-warning">
              invalid Phone number
            </span>
          ) : (
            <span className="label-text">Phone number</span>
          )}
        </label>
        <input
          type="tel"
          placeholder="050-0000000"
          value={phoneValue}
          onChange={e => setPhoneValue(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="pt-6 form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Additional info</span>
        </label>
        <input
          type="text"
          placeholder="info"
          value={infoValue}
          onChange={e => setInfoValue(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <button
        onClick={rescueRequest}
        className="p-6 mt-6 btn-primary opacity-70 w-52 h-52 rounded-full"
      >
        חשמל אותי
      </button>
    </>
  );
}
