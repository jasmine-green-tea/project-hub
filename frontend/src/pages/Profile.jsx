import React, { useState, useEffect } from 'react';
import { useProfile } from '../hooks/useProfile';
import Input from '../components/Input';
import Select from '../components/Select';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import { CameraIcon } from '@heroicons/react/24/outline';

const Profile = () => {
    const {
        profile,
        loading,
        error,
        institutes,
        directions,
        departments,
        fetchDirections,
        fetchDepartments,
        updateProfile,
        uploadAvatar,
        refetchProfile,
    } = useProfile();

    // Состояние формы
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        direction_id: '',
        admission_year: '',
        department_id: '',
    });
    const [selectedInstituteId, setSelectedInstituteId] = useState('');
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [uploadingAvatar, setUploadingAvatar] = useState(false);
    const [formError, setFormError] = useState('');
    const [originalData, setOriginalData] = useState({});
    const [isDirty, setIsDirty] = useState(false);

    // Заполнение формы при загрузке профиля
    useEffect(() => {
        if (!profile) return;

        // Базовые поля
        const newFormData = {
            role: profile.role,
            name: profile.name || '',
            surname: profile.surname || '',
            direction_id: profile.direction_id || '',
            admission_year: profile.admission_year || '',
            department_id: profile.department_id || '',
        };
        if (profile.institute_id) {
            setSelectedInstituteId(profile.institute_id);
            if (profile.role === 'student') {
                fetchDirections(profile.institute_id);
            } else if (profile.role === 'teacher') {
                fetchDepartments(profile.institute_id);
            }
        }
        setFormData(newFormData);
        setOriginalData(newFormData);
        setIsDirty(false);
    }, [profile, fetchDirections, fetchDepartments]);

    // Обработчик изменения полей ввода
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...formData, [name]: value };
        setFormData(updated);
        const isChanged = Object.keys(updated).some(key => updated[key] !== originalData[key]);
        setIsDirty(isChanged);
    };

    // Обработчик смены института
    const handleInstituteChange = async (instituteId) => {
        setSelectedInstituteId(instituteId);
        if (profile.role === 'student') {
            await fetchDirections(instituteId);
            setFormData((prev) => ({ ...prev, direction_id: '' })); // сброс направления
        } else if (profile.role === 'teacher') {
            await fetchDepartments(instituteId);
            setFormData((prev) => ({ ...prev, department_id: '' }));
        }
    };

    // Сохранение профиля
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isDirty) return;
        setSaving(true);
        setFormError('');

        const updateData = {
            name: formData.name,
            surname: formData.surname,
        };
        if (profile.role === 'student') {
            updateData.direction_id = formData.direction_id;
            updateData.admission_year = formData.admission_year;
        } else if (profile.role === 'teacher') {
            updateData.department_id = formData.department_id;
        }

        const result = await updateProfile(updateData);
        if (!result.success) {
            setFormError(result.error);
        } else {
            await refetchProfile();
            alert('Профиль обновлён');
            setOriginalData({ ...formData });
            setIsDirty(false);
        }
        setSaving(false);
    };

    // Загрузка аватара
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleUploadAvatar = async () => {
        if (!avatarFile) return;
        setUploadingAvatar(true);
        const result = await uploadAvatar(avatarFile);
        if (result.success) {
            alert('Аватар обновлён');
            setAvatarFile(null);
            setAvatarPreview(null);
        } else {
            alert(result.error);
        }
        setUploadingAvatar(false);
    };

    if (loading) return <div className="flex justify-center p-8">Загрузка...</div>;
    if (error) return <div className="text-red-500 p-4">{error}</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className=" mx-auto text-4xl font-semibold mb-6">Профиль</h1>
            <hr class=" max-w-5xl mx-auto my-12 h-0.5 border-t-0 bg-slate-200" />
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className=' mx-auto grid grid-cols-3'>
                    <h3 className="text-xl font-semibold col-span-1">Роль в системе</h3>
                    <Input
                    name="role"
                    value={formData.role === 'teacher' ? 'Преподаватель' : 'Студент'}
                    className='col-span-2'
                    disabled
                    required
                    />
                </div>
                <hr class="my-10 h-0.5 border-t-0 bg-slate-200" />
                <div className=' mx-auto grid grid-cols-3'>
                    <h3 className="text-xl font-semibold col-span-1">Личная информация</h3>
                    <div className='col-span-2'>
                        <div className="flex items-center gap-6 mb-5">
                            <div className="relative">
                                <Avatar
                                    src={avatarPreview || profile?.avatar_path}
                                    name={`${profile?.name || ''} ${profile?.surname || ''}`}
                                    size="h-20 w-20"
                                    withFallbackIcon={false}
                                />
                                <label className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer">
                                    <CameraIcon className="h-5 w-5 text-white" />
                                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                                </label>
                            </div>
                            {avatarFile && (
                                <Button onClick={handleUploadAvatar} disabled={uploadingAvatar}>
                                    {uploadingAvatar ? 'Загрузка...' : 'Сохранить аватар'}
                                </Button>
                            )}
                        </div>
                        <Input
                            label="Имя"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className='mb-5'
                            required
                        />
                        <Input
                            label="Фамилия"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <hr class="my-10 h-0.5 border-t-0 bg-slate-200" />
                <div className=' mx-auto grid grid-cols-3 mb-8'>
                    <h3 className="text-xl font-semibold">Академический статус</h3>
                    {profile?.role === 'student' && (
                    <div className='grid col-span-2'>
                        <Select
                        label="Институт"
                        options={institutes.map((i) => ({ value: i.id, label: i.full_name }))}
                        value={selectedInstituteId}
                        onChange={(e) => handleInstituteChange(e.target.value)}
                        placeholder="Выберите институт"
                        className='mb-5'
                        />
                        <Select
                        label="Направление"
                        name="direction_id"
                        options={directions.map((d) => ({ value: d.id, label: d.full_name }))}
                        value={formData.direction_id}
                        onChange={handleChange}
                        placeholder="Выберите направление"
                        disabled={!selectedInstituteId && !formData.direction_id}
                        className='mb-5'
                        />
                        <Input
                        label="Год поступления"
                        name="admission_year"
                        type="number"
                        value={formData.admission_year}
                        onChange={handleChange}
                        placeholder="Например, 2022"
                        />
                    </div>
                    )}

                    {profile?.role === 'teacher' && (
                    <div className='grid col-span-2'>
                        <Select
                        label="Институт"
                        options={institutes.map((i) => ({ value: i.id, label: i.full_name }))}
                        value={selectedInstituteId}
                        onChange={(e) => handleInstituteChange(e.target.value)}
                        placeholder="Выберите институт"
                        className='mb-5'
                        />
                        <Select
                        label="Кафедра"
                        name="department_id"
                        options={departments.map((d) => ({ value: d.id, label: d.full_name }))}
                        value={formData.department_id}
                        onChange={handleChange}
                        placeholder="Выберите кафедру"
                        disabled={!selectedInstituteId && !formData.department_id}
                        />
                    </div>
                    )}
                </div>

                {formError && <p className="text-red-500">{formError}</p>}

                <div className='flex justify-end'>
                    <Button type="submit" disabled={!isDirty}>
                        Сохранить изменения
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Profile;