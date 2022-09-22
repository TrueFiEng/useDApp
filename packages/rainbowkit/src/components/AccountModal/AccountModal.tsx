import React from 'react';
import { useEthers, useEtherBalance } from '@usedapp/core';
import { useMainnetEnsAvatar } from '../../hooks/useMainnetEnsAvatar';
import { useMainnetEnsName } from '../../hooks/useMainnetEnsName';
import { Dialog } from '../Dialog/Dialog';
import { DialogContent } from '../Dialog/DialogContent';
import { ProfileDetails } from '../ProfileDetails/ProfileDetails';

export interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

export function AccountModal({ onClose, open }: AccountModalProps) {
  const { account, deactivate } = useEthers();
  const balance = useEtherBalance(account);
  const ensAvatar = useMainnetEnsAvatar(account);
  const ensName = useMainnetEnsName(account);

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
              balance={balance}
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
