import React from 'react';

import { Link } from 'react-router-dom';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ReactProjectsList = () => {
  // Sample data, replace with your actual projects
  // const projects = [
  //   { id: 1, name: 'Project Alpha', description: 'First React project.' },
  //   { id: 2, name: 'Project Beta', description: 'Second React project.' },
  //   { id: 3, name: 'Project Gamma', description: 'Third React project.' },
  // ];

  const style = {
    projectContainer: {
      maxWidth: 800,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      mx: 'auto', // margin left & margin right auto to center
      mt: 3, // margin top for 24px
      p: 3,
      border: '1px solid #ccc',
      borderRadius: 2,
      // boxShadow: 3,
      backgroundColor: '#fefefe',
    },
    usememoLink: {
      display: 'flex',
      flexDirection: 'column',
      mt: 2,
      whiteSpace: 'nowrap',
      fontSize: '1.2rem',
    },
    accordionBox: {
      maxWidth: '780px',
      width: '100%',
      // fontSize: '16px',
      marginLeft: '20px',
      '& .MuiAccordion-root.Mui-expanded': {
        margin: '0px',
      },
    },
    divider: {
      height: '1px',
      backgroundColor: '#333',
      margin: '20px 0',
      width: '86%',
    },
    ul: {
      // listStyleType: 'none',

      '& a': {
        color: '#4f4f50ff',
        fontSize: '1.2rem',
        textDecoration: 'none',
      },
      '& a:hover': {
        color: '#0077cc',
      },
    },
  };

  return (
    <Box sx={style.projectContainer}>
      <Typography variant="h4" gutterBottom>
        React Projects List
      </Typography>

      <Box component="ul" sx={style.ul}>
        <li>
          <Link to="/lookup">Claim Lookup with API Call</Link>
        </li>
        <li>
          <Link to="/claimform">Claim Form with server-side validation</Link>
        </li>

        <li>
          <Link to="/classComp"> Error showing: display Not Found Page</Link>
        </li>
      </Box>
      <Box component="div" sx={style.accordionBox}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography
              variant="h5"
              gutterBottom
              // sx={{ color: 'primary.main', fontSize: 20 }}
            >
              useMemo sample projects{' '}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              To memoizes the result of a computation so it only re-executes
              when its dependencies change.
            </Typography>
            <br />
            When to use:
            <ul>
              <li> Heavy Computations: (sorting, filtering, Math) </li>
              <li> prevent Unnecessary recalculations</li>
              <li> Passing derived values to Child components</li>
            </ul>
            <Box component="hr" sx={style.divider} />
            <Typography
              variant="h6"
              sx={{ color: 'primary.main', fontSize: 18 }}
            >
              Searchable User Directory
            </Typography>
            <Box sx={style.usememoLink}>
              <Box
                component="ul"
                sx={style.ul}
                style={{ marginLeft: '-20px', marginTop: '-15px' }}
              >
                <li>
                  <Link to="/usememo1">useMemo [ Mock data via props ]</Link>
                </li>

                <li>
                  <Link to="/usememo2">
                    useMemo [ Fetches User data and Stores it in State and
                    Filters the list using useMemo ]
                  </Link>
                </li>
              </Box>
              <Typography
                variant="h6"
                sx={{ color: 'primary.main', fontSize: 18 }}
              >
                Shoppig Cart Total Calculator
              </Typography>

              <Box
                component="ul"
                sx={style.ul}
                style={{ marginLeft: '-20px', marginTop: '8px' }}
              >
                <li>
                  <Link to="/usememo3">useMemo</Link>
                </li>
              </Box>

              <Typography
                variant="h6"
                sx={{ color: 'primary.main', fontSize: 18 }}
              >
                Data Table with Sorting and Pagination
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">Accordion 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
        </Accordion>
        {/* <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography component="span">Accordion Actions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </AccordionDetails>
          <AccordionActions>
            <Button>Cancel</Button>
            <Button>Agree</Button>
          </AccordionActions>
        </Accordion> */}
      </Box>
    </Box>
  );
};

export default ReactProjectsList;
