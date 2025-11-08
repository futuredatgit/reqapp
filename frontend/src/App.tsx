/**
 * ReqApp - Haupt-Anwendungskomponente
 * Enthält Routing und globale Provider
 */

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Typography, Paper } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

// React Query Client konfigurieren
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 Minuten
    },
  },
});

// Material-UI Theme konfigurieren
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5983',
      dark: '#9a0036',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

/**
 * Temporäre Landing-Page für Phase 1
 * Wird in späteren Phasen durch echte Komponenten ersetzt
 */
const LandingPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 6,
          maxWidth: 600,
          textAlign: 'center',
          borderRadius: 4,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom color="primary">
          🚀 ReqApp
        </Typography>
        
        <Typography variant="h5" component="h2" gutterBottom color="text.secondary">
          Konzept-Erstellungs-Applikation
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ mt: 3, mb: 4 }}>
          Willkommen bei ReqApp - der webbasierten Anwendung zur Erstellung und 
          Verwaltung von Konzepten mit KI-Unterstützung und GitHub-Integration.
        </Typography>
        
        <Box sx={{ mt: 4, p: 3, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            🔧 Phase 1: Setup abgeschlossen
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            ✅ Docker-Umgebung konfiguriert<br />
            ✅ Backend-Grundgerüst (TypeScript/Express)<br />
            ✅ Frontend-Grundgerüst (React/TypeScript)<br />
            ✅ PostgreSQL-Datenbank vorbereitet<br />
            ✅ ESLint + Prettier konfiguriert
          </Typography>
        </Box>
        
        <Box sx={{ mt: 4, p: 3, bgcolor: '#e3f2fd', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom color="primary">
            📅 Nächste Schritte
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            🔄 Phase 2: Datenbank-Schema implementieren<br />
            🔐 Phase 3: Authentication & Authorization<br />
            👤 Phase 4: User Management<br />
            🐙 Phase 5: GitHub-Integration<br />
            🤖 Phase 6: LLM-Framework
          </Typography>
        </Box>
        
        <Typography variant="caption" display="block" sx={{ mt: 4 }} color="text.secondary">
          Version 1.0.0 | 8. November 2025
        </Typography>
      </Paper>
    </Box>
  );
};

/**
 * Haupt-App-Komponente
 */
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <LandingPage />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;