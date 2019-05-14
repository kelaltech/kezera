import React from 'react'
import { Dialog } from '@material-ui/core'
import { DialogProps } from '@material-ui/core/Dialog'

import './isuue-certificate-dialog.scss'

type Props = DialogProps & {
  // todo
}

function IssueCertificateDialog({ ...dialogProps }: Props) {
  return <Dialog {...dialogProps}>{/* todo */}</Dialog>
}

export default IssueCertificateDialog
