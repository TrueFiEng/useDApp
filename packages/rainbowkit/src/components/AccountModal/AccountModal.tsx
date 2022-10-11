import { useEnsAvatar, useEtherBalance, useEthers, useLookupAddress } from '@usedapp/core';
import React from 'react';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { ProfileDetails } from '../ProfileDetails/ProfileDetails';

export interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function AccountModal({ onClose, open }: AccountModalProps) {
  const { account, deactivate } = useEthers();
  const { ensAvatar } = useEnsAvatar(account);
  const { ens: ensName } = useLookupAddress(account);
  const balanceData = useEtherBalance(account);


  if (!account) {
    return null;
  }

  const titleId = 'rk_account_modal_title';

  return (
    <>
      {account && (
        <Dialog onClose={onClose} open={open} titleId={titleId}>
          <DialogContent bottomSheetOnMobile padding="0">
            <ProfileDetails
              address={account}
              balanceData={balanceData}
              ensAvatar={ensAvatar}
              ensName={ensName}
              onClose={onClose}
              onDisconnect={deactivate}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
