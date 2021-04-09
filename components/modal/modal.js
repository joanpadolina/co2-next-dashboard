import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import ChargeInput from '../../pages/charge-input';

export default function FormModal() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    if (router.asPath === '/charge-input') {
      setIsOpen(true);
    } else {
      setIsOpen(false)
    }
  }, []);

  return (
    <Modal isOpen={router.asPath === '/charge-input' ? true : false}>
      <ChargeInput />
    </Modal>
  );
}
