import Input from './input/Input';
import LoadingButton from './base/button/LoadingButton';
import {useForm} from 'react-hook-form';
import Select from './input/Select';
import LabelWithValueGroup from './base/LabelWithValueGroup';
import purchaseGoodRequest from '../core/api_requests/goods/purchaseGoodRequest';
import {useEffect, useState} from 'react';
import {head, prop, toString} from 'ramda';
import pascalCaseToWords from '../core/formatters/pascalCaseToWords';
import getShipCargoFor from '../core/ship/getShipCargoFor';
import {toast} from 'react-toastify';
import pascalCaseToWordsAndUpperCaseFirstChar from '../core/formatters/pascalCaseToWordsAndUpperCaseFirstChar';

function BuyGoodsDialog({ownedShipsAtLocation, selectedGood, callbackFn}) {
    const {register, handleSubmit, watch, errors, formState} = useForm({mode: 'onChange'});
    const [selectedShip, setSelectedShip] = useState();

    const watchQuantity = watch('quantity');

    useEffect(() => {
        setSelectedShip(head(ownedShipsAtLocation));
    }, []);

    const buyGoods = ({shipId, quantity}) => {
        purchaseGoodRequest(selectedGood.symbol, quantity, shipId).then((response) => {
            toast.success(`${quantity}x ${pascalCaseToWordsAndUpperCaseFirstChar(selectedGood.symbol)} bought.`);

            callbackFn();
        });
    };

    const shipOptions = ownedShipsAtLocation.map((ship) => ({label: ship.type, value: ship.id}));

    const handleSelectedShipChange = (event) => {
        setSelectedShip(ownedShipsAtLocation.find((ship) => ship.id === event.target.value));
    };

    const maxQuantity = Math.floor(prop('spaceAvailable', selectedShip) / selectedGood.volumePerUnit) || 0;

    return (
        <form onSubmit={handleSubmit(buyGoods)}>
            <div className="text-xl pb-4">Buy {pascalCaseToWords(selectedGood.symbol)}</div>

            <Select name="shipId" options={shipOptions} className="mb-4" value={prop('id', selectedShip)} onChange={handleSelectedShipChange} reference={register({required: true})}/>

            <Input name="quantity" placeholder="Quantity" type="number" min={0} max={maxQuantity} className="mb-4" reference={register({required: true})}/>

            <LabelWithValueGroup
                labelWidthClass="w-48"
                entries={[
                    {label: 'In ship cargo', value: getShipCargoFor(selectedGood.symbol, selectedShip)},
                    {label: 'Ship space available', value: prop('spaceAvailable', selectedShip)},
                    {label: 'Needed space', value: toString(watchQuantity * selectedGood.volumePerUnit)},
                    {label: 'Cost', value: toString(watchQuantity * selectedGood.pricePerUnit)},
                ]}
                showBackgrounds
            />

            <LoadingButton type="submit" label="Buy goods" disabled={!formState.isValid}/>
        </form>
    );
}

export default BuyGoodsDialog;