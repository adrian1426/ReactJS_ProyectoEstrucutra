import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import PDFViewer from 'pdf-viewer-reactjs';

import DialogContainer from './../../common/dialog/dialogContainer/DialogContainer';
import DialogContent from './../../common/dialog/dialogContainer/DialogContent';
import Styles from './EmployeeListDocuments.module.css';

const EmployeeListDocumentViewer = props => {
    const { openDocument, closeDocument, urlSigned, validation, loadingDocument } = props;
    let view = 'Obteniendo documento';
    if (!loadingDocument) {
        view = validation ? <img src={urlSigned} /> :
            <PDFViewer
            canvasCss={Styles.Canvas}
            navigation={
                {
                  css: {
                    navbarWrapper: Styles.NavbarWrapper,
                    previousPageBtn: Styles.Button,
                    zoomOutBtn:  Styles.Button,
                    resetZoomBtn: Styles.Button,
                    zoomInBtn: Styles.Button,
                    nextPageBtn: Styles.Button,
                    rotateLeftBtn:Styles.Button,
                    resetRotationBtn:Styles.Button,
                    rotateRightBtn:Styles.Button,
                    pageIndicator: Styles.PageIndicator
                  },
                }
              }
                hideRotation={true} navbarOnTop={true}
                loader={<CircularProgress />}
                document={{ url: urlSigned }} />
    }
    return (
        <DialogContainer
            open={openDocument}
            handleClose={closeDocument}
            title={'Documento'}
        >
            <div>
                <DialogContent>
                    {view}
                </DialogContent>
            </div>
        </DialogContainer>
    );
};

export default EmployeeListDocumentViewer;