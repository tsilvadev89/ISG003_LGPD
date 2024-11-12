import { Stack } from '@mui/material';

interface LayoutProps {
  template: string;
}

const Dashboard: React.FC<LayoutProps> = ({ template }) => {

  return (
    <Stack direction={template === 'mobile' ? 'column' : 'row'}>
      
    </Stack>
  );
}

export default Dashboard;
