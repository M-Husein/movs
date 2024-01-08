import { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { HttpError, useList } from "@refinedev/core";

export function CastCrew({
  enabled,
  language,
  id,
  onLoadImage,
}: any){
  const [firstOpenCollapse, setFirstOpenCollapse] = useState<boolean>(false);

  const {
    data,
    isLoading,
    isFetching,
    isRefetching,
  } = useList<any, HttpError>({
    queryOptions: {
      retry: false,
      enabled: !!enabled && firstOpenCollapse,
    },
    resource: "movie/" + id + "/credits",
    meta: {
      params: {
        language,
      }
    },
  });

  return (
    <div className="my-4 border rounded">
      {[
        { label: "Cast", as: "As" },
        { label: "Crew", as: "Job" },
      ].map((coll: any) =>
        <Accordion key={coll.label}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls={coll.label}
            id={coll.label}
            onClick={() => setFirstOpenCollapse(true)}
          >
            {coll.label}
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
              <Table sx={{ minWidth: 650 }} size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>{coll.as}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading || isFetching || isRefetching ?
                    [1, 2, 3].map((item: number) =>
                      <TableRow key={item}>
                        <TableCell align="center" sx={{ width: 70 }}>
                          <Skeleton variant="circular" width={56} height={56} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="h3">
                            <Skeleton />
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h3">
                            <Skeleton />
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )
                    :
                    (data?.[coll.label === 'Cast' ? 'cast' : 'crew'] || []).map((item: any) => (
                      <TableRow
                        key={item.id + item.credit_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center" sx={{ width: 70 }}>
                          <Avatar
                            alt={item.name}
                            imgProps={{
                              loading: "lazy",
                              decoding: "async",
                              className: "bg-slate-300",
                              onLoad: onLoadImage,
                            }}
                            src={item.profile_path ? "https://image.tmdb.org/t/p/w500" + item.profile_path : undefined}
                            sx={{ width: 56, height: 56 }}
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item[coll.label === 'Cast' ? 'character' : 'job']}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  )
}
