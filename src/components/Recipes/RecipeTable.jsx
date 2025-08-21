import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Rating from 'react-rating-stars-component';
import {
	Drawer,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Pagination,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const defaultLimit = 15;

export default function RecipeTable() {
	const [recipes, setRecipes] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(defaultLimit);
	const [total, setTotal] = useState(0);
	const [selected, setSelected] = useState(null);
	const [titleFilter, setTitleFilter] = useState('');
	const [cuisineFilter, setCuisineFilter] = useState('');
	const [ratingOp, setRatingOp] = useState('>=');
	const [ratingVal, setRatingVal] = useState('');
	const [timeOp, setTimeOp] = useState('<=');
	const [timeVal, setTimeVal] = useState('');
	const [calOp, setCalOp] = useState('<=');
	const [calVal, setCalVal] = useState('');

	const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

	useEffect(() => {
		axios.get(`/api/recipes?page=${page}&limit=${limit}`).then(res => {
			setRecipes(res.data.data || []);
			setTotal(res.data.total || 0);
		});
	}, [page, limit]);

	const applySearch = async () => {
		const params = new URLSearchParams();
		if (titleFilter) params.set('title', titleFilter);
		if (cuisineFilter) params.set('cuisine', cuisineFilter);
		if (ratingVal) params.set('rating', `${ratingOp}${ratingVal}`);
		if (timeVal) params.set('total_time', `${timeOp}${timeVal}`);
		if (calVal) params.set('calories', `${calOp}${calVal}`);
		const res = await axios.get(`/api/recipes/search?${params.toString()}`);
		setRecipes(res.data.data || []);
		setTotal(res.data.data ? res.data.data.length : 0);
		setPage(1);
	};

	return (
		<div className="p-4 space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
				<TextField label="Title" size="small" value={titleFilter} onChange={e => setTitleFilter(e.target.value)} />
				<TextField label="Cuisine" size="small" value={cuisineFilter} onChange={e => setCuisineFilter(e.target.value)} />
				<div className="flex gap-2 items-end">
					<FormControl size="small" className="min-w-[90px]">
						<InputLabel>Rating</InputLabel>
						<Select label="Rating" value={ratingOp} onChange={e => setRatingOp(e.target.value)}>
							<MenuItem value=">=">≥</MenuItem>
							<MenuItem value="<=">≤</MenuItem>
							<MenuItem value="=">=</MenuItem>
						</Select>
					</FormControl>
					<TextField label="Value" size="small" type="number" value={ratingVal} onChange={e => setRatingVal(e.target.value)} />
				</div>
				<div className="flex gap-2 items-end">
					<FormControl size="small" className="min-w-[90px]">
						<InputLabel>Total Time</InputLabel>
						<Select label="Total Time" value={timeOp} onChange={e => setTimeOp(e.target.value)}>
							<MenuItem value=">=">≥</MenuItem>
							<MenuItem value="<=">≤</MenuItem>
							<MenuItem value="=">=</MenuItem>
						</Select>
					</FormControl>
					<TextField label="Minutes" size="small" type="number" value={timeVal} onChange={e => setTimeVal(e.target.value)} />
				</div>
				<div className="flex gap-2 items-end">
					<FormControl size="small" className="min-w-[90px]">
						<InputLabel>Calories</InputLabel>
						<Select label="Calories" value={calOp} onChange={e => setCalOp(e.target.value)}>
							<MenuItem value=">=">≥</MenuItem>
							<MenuItem value="<=">≤</MenuItem>
							<MenuItem value="=">=</MenuItem>
						</Select>
					</FormControl>
					<TextField label="kCal" size="small" type="number" value={calVal} onChange={e => setCalVal(e.target.value)} />
				</div>
				<button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={applySearch}>Search</button>
			</div>

			<TableContainer className="border rounded">
				<Table size="small">
					<TableHead>
						<TableRow>
							<TableCell>Title</TableCell>
							<TableCell>Cuisine</TableCell>
							<TableCell>Rating</TableCell>
							<TableCell>Total Time</TableCell>
							<TableCell>Serves</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{recipes.length === 0 && (
							<TableRow>
								<TableCell colSpan={5} align="center">No results found</TableCell>
							</TableRow>
						)}
						{recipes.map(r => (
							<TableRow hover key={r.id} className="cursor-pointer" onClick={() => setSelected(r)}>
								<TableCell title={r.title}>{(r.title || '').slice(0, 40)}{(r.title || '').length > 40 ? '…' : ''}</TableCell>
								<TableCell>{r.cuisine || '-'}</TableCell>
								<TableCell>
									<Rating value={Number(r.rating) || 0} isHalf={true} edit={false} size={20} />
								</TableCell>
								<TableCell>{r.total_time ?? '-'}</TableCell>
								<TableCell>{r.serves || '-'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span>Per page:</span>
					<select className="border rounded px-2 py-1" value={limit} onChange={e => setLimit(Number(e.target.value))}>
						{[15, 20, 30, 40, 50].map(n => <option key={n} value={n}>{n}</option>)}
					</select>
				</div>
				<Pagination page={page} onChange={(_e, p) => setPage(p)} count={totalPages} />
			</div>

			<Drawer anchor="right" open={!!selected} onClose={() => setSelected(null)}>
				<div className="w-[380px] p-4 space-y-3">
					<div className="flex items-center justify-between">
						<div>
							<div className="font-semibold">{selected?.title}</div>
							<div className="text-sm text-gray-500">{selected?.cuisine || '-'}</div>
						</div>
						<IconButton onClick={() => setSelected(null)}><CloseIcon /></IconButton>
					</div>
					<div>
						<div className="font-medium">Description</div>
						<div className="text-sm whitespace-pre-wrap">{selected?.description || '-'}</div>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<div className="border rounded p-2">
							<div className="text-xs text-gray-500">Total Time</div>
							<div className="font-medium">{selected?.total_time ?? '-'}</div>
						</div>
						<div className="border rounded p-2">
							<div className="text-xs text-gray-500">Rating</div>
							<div className="font-medium"><Rating value={Number(selected?.rating) || 0} isHalf={true} edit={false} size={20} /></div>
						</div>
					</div>
					<details className="border rounded p-2">
						<summary className="cursor-pointer">Prep and Cook Time</summary>
						<div className="grid grid-cols-2 gap-2 mt-2">
							<div>
								<div className="text-xs text-gray-500">Prep Time</div>
								<div className="font-medium">{selected?.prep_time ?? '-'}</div>
							</div>
							<div>
								<div className="text-xs text-gray-500">Cook Time</div>
								<div className="font-medium">{selected?.cook_time ?? '-'}</div>
							</div>
						</div>
					</details>
					<div>
						<div className="font-medium mb-1">Nutrients</div>
						<Table size="small">
							<TableBody>
								{[
									['calories', 'Calories'],
									['carbohydrateContent', 'Carbs'],
									['cholesterolContent', 'Cholesterol'],
									['fiberContent', 'Fiber'],
									['proteinContent', 'Protein'],
									['saturatedFatContent', 'Sat Fat'],
									['sodiumContent', 'Sodium'],
									['sugarContent', 'Sugar'],
									['fatContent', 'Fat'],
								].map(([k, label]) => (
									<TableRow key={k}>
										<TableCell className="text-sm text-gray-600">{label}</TableCell>
										<TableCell className="text-sm">{selected?.nutrients?.[k] ?? '-'}</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</Drawer>
		</div>
	);
}

