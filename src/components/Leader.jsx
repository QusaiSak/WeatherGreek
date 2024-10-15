import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TrophyIcon, ShieldIcon, SwordIcon, AnchorIcon } from 'lucide-react';

const leaderboardData = [
  { name: "Alexandros", score: 950, rank: 1, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Dimitra", score: 900, rank: 2, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Nikos", score: 850, rank: 3, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Eleni", score: 800, rank: 4, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "Kostas", score: 750, rank: 5, avatar: "/placeholder.svg?height=40&width=40" },
];

const getRankIcon = (rank) => {
  switch (rank) {
    case 1:
      return <TrophyIcon className="h-6 w-6 text-yellow-400 drop-shadow-glow" />;
    case 2:
      return <ShieldIcon className="h-6 w-6 text-gray-300 drop-shadow-glow" />;
    case 3:
      return <SwordIcon className="h-6 w-6 text-orange-400 drop-shadow-glow" />;
    default:
      return <AnchorIcon className="h-5 w-5 text-blue-400" />;
  }
};

export default function Leaderboard() {
  return (
    <div className="bg-gradient-to-br from-[#2e3440] to-[#4c566a] text-[#eceff4] p-8 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#88c0d0] to-[#81a1c1] font-rocket">
            Poseidon's Leaderboard
          </h1>
          <TrophyIcon className="h-12 w-12 text-[#88c0d0] drop-shadow-glow" />
        </div>
        
        <Card className="bg-gradient-to-b from-[#3b4252] to-[#434c5e] border-[#4c566a] shadow-xl">
          <CardHeader className="border-b border-[#4c566a]">
            <CardTitle className="text-3xl font-medium text-[#e5e9f0] font-rocket">Top Competitors</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-[#434c5e]">
                <TableRow>
                  <TableHead className="text-[#d8dee9] font-bold">Rank</TableHead>
                  <TableHead className="text-[#d8dee9] font-bold">Name</TableHead>
                  <TableHead className="text-[#d8dee9] font-bold">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaderboardData.map((item, index) => (
                  <TableRow 
                    key={index} 
                    className={`
                      ${index % 2 === 0 ? 'bg-[#3b4252]' : 'bg-[#434c5e]'}
                      hover:bg-[#4c566a] transition-colors duration-200
                    `}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        {getRankIcon(item.rank)}
                        <span className="text-lg">{item.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="border-2 border-[#88c0d0] shadow-md">
                          <AvatarImage src={item.avatar} alt={item.name} />
                          <AvatarFallback className="bg-[#5e81ac] text-[#eceff4]">{item.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-lg font-semibold">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={`
                          text-lg font-bold px-3 py-1
                          ${item.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                            item.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-500' :
                            item.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                            'bg-gradient-to-r from-[#5e81ac] to-[#81a1c1]'}
                          text-[#2e3440]
                        `}
                      >
                        {item.score}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}