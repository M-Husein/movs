import { ReactNode, ErrorInfo, Component } from 'react';
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import i18n from "@/i18n";

interface ErrorBoundaryProps {
  children?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(){ // error: Error
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo){
    this.props.onError?.(error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <Alert 
        severity="error" 
        sx={{ py: 2 }}
        className="grid place-content-center my-4"
      >
        <AlertTitle sx={{ mb: 2 }}>
          {i18n.t('pages.error.unspecific')}
        </AlertTitle>

        {!navigator.onLine && <p><strong>No internet connection</strong></p>}

        <Button
          component={Link}
          to="/"
          variant="outlined"
        >
          {i18n.t('pages.error.backHome')}
        </Button>
      </Alert>
    )
    :
    this.props.children
  }
}
