import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Tabs, Tab, Box } from '@mui/material';
import AppConstants from '../constants/app-constants';
import ToolBase64EncoderDecoder from './tools/ToolBase64EncoderDecoder';
import ToolEpoch from './tools/ToolEpoch';
import ToolJSONFormatter from './tools/ToolJSONFormatter';
import ToolJWTDecoder from './tools/ToolJWTDecoder';
import ToolMarkdown from './tools/ToolMarkdown';
import ToolUUID from './tools/ToolUUID';
import ToolXMLFormatter from './tools/ToolXMLFormatter';
import ToolXMLToJSON from './tools/ToolXMLToJSON';
import ToolEditor from './tools/ToolEditor';

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
          <ToolBase64EncoderDecoder />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <ToolEpoch />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <ToolJSONFormatter />
        </TabPanel>
        <TabPanel value={selectedTab} index={3}>
          <ToolJWTDecoder />
        </TabPanel>
        <TabPanel value={selectedTab} index={4}>
          <ToolMarkdown />
        </TabPanel>
        <TabPanel value={selectedTab} index={5}>
          <ToolUUID />
        </TabPanel>
        <TabPanel value={selectedTab} index={6}>
          <ToolXMLFormatter />
        </TabPanel>
        <TabPanel value={selectedTab} index={7}>
          <ToolXMLToJSON />
        </TabPanel>
        <TabPanel value={selectedTab} index={8}>
          <ToolEditor />
        </TabPanel>
      </Grid>
    </Grid>
  );
}

export default AppBody;
