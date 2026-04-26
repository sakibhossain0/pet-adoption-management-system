protected $table = 'pets';
    protected $primaryKey = 'pet_id';
    public $timestamps = false;

    protected $fillable = [
        'name',
        'age',
        'gender',
        'breed',
        'temperament',
        'adopt_status',
        'species',
        'shid',
        'fid',
    ];
