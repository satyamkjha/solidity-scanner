import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Box, Text, Progress } from '@chakra-ui/react';

import { ProjectSummary } from 'common/types';
import { LogoIcon } from 'components/icons';
import Score from 'components/score';

const projectList: ProjectSummary[] = [
  {
    project_name: 'Test dummy project 1',
    task_status: 'COMPLETED',
    task_id: '1',
    last_updated: 3,
    task_added: 3,
  },
  {
    project_name: 'Test dummy project 2',
    task_status: 'COMPLETED',
    task_id: '2',
    last_updated: 3,
    task_added: 3,
  },
  {
    project_name: 'Test dummy project 3',
    task_status: 'COMPLETED',
    task_id: '3',
    last_updated: 3,
    task_added: 3,
  },
  {
    project_name: 'Test dummy project 4',
    task_status: 'COMPLETED',
    task_id: '4',
    last_updated: 3,
    task_added: 3,
  },
  {
    project_name: 'Test dummy project 5',
    task_status: 'IN_PROGRESS',
    task_id: '5',
    last_updated: 3,
    task_added: 3,
  },
];

const Projects: React.FC = () => {
  return (
    <Box
      sx={{
        w: '100%',
        bg: 'bg.subtle',
        borderRadius: '20px',
        py: 4,
        px: 8,
        mx: [0, 0, 4],
        my: 4,
      }}
    >
      <Flex
        sx={{
          w: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          my: 4,
        }}
      >
        <Text sx={{ color: 'subtle', fontWeight: 600 }}>PROJECTS</Text>
      </Flex>
      <Flex
        sx={{
          flexWrap: 'wrap',
          justifyItems: ['center', 'center', 'space-around'],
        }}
      >
        {projectList.map((projectData) => (
          <ProjectCard projectData={projectData} />
        ))}
      </Flex>
    </Box>
  );
};

const ProjectCard: React.FC<{ projectData: ProjectSummary }> = ({
  projectData,
}) => {
  const { task_status, project_name, task_id } = projectData;

  return (
    <Link
      to={task_status === 'COMPLETED' ? `/projects/${task_id}` : '/projects'}
    >
      <Flex
        sx={{
          cursor: task_status === 'COMPLETED' ? 'pointer' : 'not-allowed',
          flexDir: 'column',
          justifyContent: 'space-between',
          w: '320px',
          h: '230px',
          my: 4,
          mr: 8,
          p: 5,
          borderRadius: 15,
          bg: 'white',
          transition: '0.3s box-shadow',
          boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.05)',
          _hover: {
            boxShadow: '0px 4px 24px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Box>
          <Text>{project_name}</Text>
          <Text sx={{ fontSize: 'sm', color: 'subtle' }}>
            Last scanned 3 days ago
          </Text>
        </Box>
        {task_status === 'COMPLETED' ? (
          <>
            <Score score={3.7} />
            <VulnerabilityDistribution critical={0} medium={1} low={11} />
          </>
        ) : (
          <Box>
            <Flex
              sx={{
                display: 'inline-flex',
                bg: 'bg.subtle',
                alignItems: 'center',
                p: 2,
                mb: 2,
                borderRadius: 15,
              }}
            >
              <LogoIcon size={15} />
              <Text mx={2} fontSize="sm">
                Scan in progress
              </Text>
            </Flex>
            <Progress value={20} isIndeterminate size="xs" />
          </Box>
        )}
      </Flex>
    </Link>
  );
};

const VulnerabilityDistribution: React.FC<{
  critical: number;
  medium: number;
  low: number;
}> = ({ critical, medium, low }) => {
  return (
    <Flex
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        mx: 2,
      }}
    >
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>
          {critical + medium + low}
        </Text>
        <Text sx={{ color: 'subtle', fontSize: 'xs' }}>Total</Text>
        <Box
          sx={{ w: '24px', h: '3px', bgColor: 'gray.400', ml: '1px', mt: 1 }}
        />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{critical}</Text>
        <Text sx={{ color: 'subtle', fontSize: 'xs' }}>Critical</Text>
        <Box
          sx={{ w: '24px', h: '3px', bgColor: 'critical', ml: '1px', mt: 1 }}
        />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{medium}</Text>
        <Text sx={{ color: 'subtle', fontSize: 'xs' }}>Medium</Text>
        <Box
          sx={{ w: '24px', h: '3px', bgColor: 'medium', ml: '1px', mt: 1 }}
        />
      </Box>
      <Box>
        <Text sx={{ lineHeight: 1.2, fontWeight: 600 }}>{low}</Text>
        <Text sx={{ color: 'subtle', fontSize: 'xs' }}>Low</Text>
        <Box sx={{ w: '24px', h: '3px', bgColor: 'low', ml: '1px', mt: 1 }} />
      </Box>
    </Flex>
  );
};

export default Projects;
