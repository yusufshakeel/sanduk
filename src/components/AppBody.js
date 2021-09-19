import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Tabs, Tab, Box, Typography } from '@mui/material';
import AppConstants from '../constants/app-constants';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

function AppBody() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSelectedTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Grid container sx={{ height: `calc(100% - 64px)` }}>
      <Grid
        item
        sx={{
          width: '250px',
          height: '100%',
          overflow: 'scroll',
          borderRight: 1,
          borderColor: 'divider'
        }}
      >
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={selectedTab}
          onChange={handleSelectedTab}
        >
          {AppConstants.APP_TOOLS.map((tool, index) => {
            return (
              <Tab
                label={tool.name}
                key={index}
                {...a11yProps(index)}
                sx={{ textTransform: 'none', fontSize: '1em' }}
              />
            );
          })}
        </Tabs>
      </Grid>
      <Grid item sx={{ width: `calc(100% - 250px)`, height: '100%', overflow: 'scroll' }}>
        <TabPanel value={selectedTab} index={0}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Base64 Encoder Decoder
          </Typography>
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Epoch
          </Typography>
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            JSON Formatter
          </Typography>
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            JWT Decoder
          </Typography>
        </TabPanel>
        <TabPanel value={selectedTab} index={4}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Markdown
          </Typography>
        </TabPanel>
        <TabPanel value={selectedTab} index={5}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            UUID
          </Typography>
        </TabPanel>
        <TabPanel value={selectedTab} index={6}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            XML Formatter
          </Typography>
        </TabPanel>
        <TabPanel value={selectedTab} index={7}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            XML to JSON
          </Typography>
        </TabPanel>
        <TabPanel value={selectedTab} index={8}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            Editor
          </Typography>
        </TabPanel>
      </Grid>
    </Grid>
  );
}

export default AppBody;
